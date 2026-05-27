import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScreeningSchema } from '../schema/screening.schema';

export interface ScreeningNotificationDto {
    id: number;
    movieId: number;
    movieName: string;
    cinemaId: number;
    cinemaName: string;
    cinemaLocation: string;
    exhibitionAt: Date;
}

@Injectable()
export class ScreeningRepository {
    constructor(
        @InjectRepository(ScreeningSchema)
        private readonly screeningRepository: Repository<ScreeningSchema>,
    ) {}

    async create(data: { movieId: number; cinemaId: number; exhibitionAt: Date }): Promise<ScreeningSchema> {
        const item = this.screeningRepository.create(data);
        return this.screeningRepository.save(item);
    }

    async findByCinema(cinemaId: number): Promise<ScreeningSchema[]> {
        return this.screeningRepository.find({
            where: { cinemaId },
            order: { exhibitionAt: 'ASC' },
        });
    }

    async findUpcomingNotificationsByUser(userId: number): Promise<ScreeningNotificationDto[]> {
        const rows = await this.screeningRepository
            .createQueryBuilder('screening')
            .innerJoin('watchlist', 'watchlist', 'watchlist.movie_id = screening.movie_id AND watchlist.user_id = :userId AND watchlist.deleted_at IS NULL', { userId })
            .innerJoin('movie', 'movie', 'movie.id = screening.movie_id AND movie.deleted_at IS NULL')
            .innerJoin('cinema', 'cinema', 'cinema.id = screening.cinema_id AND cinema.deleted_at IS NULL')
            .where('screening.deleted_at IS NULL')
            .andWhere('screening.exhibition_at >= NOW()')
            .select([
                'screening.id AS id',
                'screening.movie_id AS movieId',
                'screening.cinema_id AS cinemaId',
                'screening.exhibition_at AS exhibitionAt',
                'movie.name AS movieName',
                'cinema.name AS cinemaName',
                'cinema.location AS cinemaLocation',
            ])
            .orderBy('screening.exhibition_at', 'ASC')
            .limit(20)
            .getRawMany();

        return rows.map((row) => ({
            id: Number(row.id),
            movieId: Number(row.movieId),
            movieName: String(row.movieName),
            cinemaId: Number(row.cinemaId),
            cinemaName: String(row.cinemaName),
            cinemaLocation: String(row.cinemaLocation),
            exhibitionAt: new Date(row.exhibitionAt),
        }));
    }
}
