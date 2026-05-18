import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieRepository } from '../infra/repository/movie.repository';

export interface MovieCoverSuggestionDto {
    title: string;
    year?: string;
    plot?: string;
    imdbId: string;
    coverUrl: string;
}

interface OmdbSearchItem {
    Title: string;
    Year: string;
    imdbID: string;
    Poster: string;
}

interface OmdbSearchResponse {
    Search?: OmdbSearchItem[];
    Response: 'True' | 'False';
}

interface OmdbMovieDetailResponse {
    Title: string;
    Year: string;
    Plot: string;
    imdbID: string;
    Poster: string;
    Response: 'True' | 'False';
}

@Injectable()
export class MovieService {
    constructor(private readonly movieRepository: MovieRepository) {}

    findAll(name?: string) {
        return this.movieRepository.findAll(name ? { name } : undefined);
    }

    async findOne(id: number) {
        const movie = await this.movieRepository.findOne({ id });
        if (!movie) throw new NotFoundException('Filme não encontrado');
        return movie;
    }

    create(name: string, coverUrl?: string, year?: string, plot?: string, imdbId?: string) {
        return this.movieRepository.create({ name, coverUrl, year, plot, imdbId });
    }

    async update(id: number, name: string, coverUrl?: string, year?: string, plot?: string, imdbId?: string) {
        const movie = await this.movieRepository.update({ id, name, coverUrl, year, plot, imdbId });
        if (!movie) throw new NotFoundException('Filme não encontrado');
        return movie;
    }

    private get omdbApiKey(): string {
        return process.env.OMDB_API_KEY ?? '3a712ffd';
    }

    private toPosterUrl(imdbId: string, fallbackPoster?: string): string {
        const posterById = `https://img.omdbapi.com/?apikey=${this.omdbApiKey}&i=${encodeURIComponent(imdbId)}`;
        if (fallbackPoster && fallbackPoster !== 'N/A') return fallbackPoster;
        return posterById;
    }

    private async fetchOmdbById(imdbId: string): Promise<OmdbMovieDetailResponse | null> {
        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${this.omdbApiKey}&i=${encodeURIComponent(imdbId)}`,
        );
        if (!response.ok) return null;
        const data = (await response.json()) as OmdbMovieDetailResponse;
        if (data.Response !== 'True') return null;
        return data;
    }

    private sanitizeField(value?: string): string | undefined {
        if (!value || value === 'N/A') return undefined;
        return value;
    }

    async suggestCovers(name: string, year?: string): Promise<MovieCoverSuggestionDto[]> {
        const query = name.trim();
        if (!query) return [];

        const cleanYear = year?.trim();
        const hasYear = Boolean(cleanYear);

        const params = new URLSearchParams({
            apikey: this.omdbApiKey,
            s: query,
            type: 'movie',
        });

        if (hasYear) params.set('y', cleanYear as string);

        const response = await fetch(
            `https://www.omdbapi.com/?${params.toString()}`,
        );
        if (!response.ok) return [];

        const data = (await response.json()) as OmdbSearchResponse;
        if (data.Response !== 'True' || !data.Search?.length) return [];

        const topResults = data.Search.slice(0, 3);
        const detailed = await Promise.all(
            topResults.map(async (item) => {
                const detail = await this.fetchOmdbById(item.imdbID);
                const title = this.sanitizeField(detail?.Title) ?? this.sanitizeField(item.Title) ?? query;
                const year = this.sanitizeField(detail?.Year) ?? this.sanitizeField(item.Year);
                const plot = this.sanitizeField(detail?.Plot);

                return {
                    title,
                    year,
                    plot,
                    imdbId: item.imdbID,
                    coverUrl: this.toPosterUrl(item.imdbID, detail?.Poster ?? item.Poster),
                };
            }),
        );

        return detailed;
    }

    async remove(id: number) {
        const deleted = await this.movieRepository.softDelete({ id });
        if (!deleted) throw new NotFoundException('Filme não encontrado');
        return { message: 'Filme removido' };
    }
}
