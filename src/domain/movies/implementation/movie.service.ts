import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieRepository } from '../infra/repository/movie.repository';

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

    create(name: string) {
        return this.movieRepository.create({ name });
    }

    async update(id: number, name: string) {
        const movie = await this.movieRepository.update({ id, name });
        if (!movie) throw new NotFoundException('Filme não encontrado');
        return movie;
    }

    async remove(id: number) {
        const deleted = await this.movieRepository.softDelete({ id });
        if (!deleted) throw new NotFoundException('Filme não encontrado');
        return { message: 'Filme removido' };
    }
}
