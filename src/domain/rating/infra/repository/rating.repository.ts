import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RatingSchema } from '../schema/rating.schema';
import { Repository } from 'typeorm';

@Injectable()
export class RatingRepository {
    constructor(
        @InjectRepository(RatingSchema)
        private ratingRepository: Repository<RatingSchema>,
    ) {}

    async findByMovie(movieId: number): Promise<RatingSchema[]> {
        return this.ratingRepository.find({ where: { movieId } });
    }

    async upsert(data: { userId: number; movieId: number; score: number }): Promise<RatingSchema> {
        const existing = await this.ratingRepository.findOne({
            where: { userId: data.userId, movieId: data.movieId },
        });
        if (existing) {
            await this.ratingRepository.update({ id: existing.id }, { score: data.score });
            return (await this.ratingRepository.findOne({ where: { id: existing.id } }))!;
        }
        const rating = this.ratingRepository.create(data);
        return this.ratingRepository.save(rating);
    }

    async softDelete(id: number): Promise<boolean> {
        const result = await this.ratingRepository.softDelete({ id });
        return (result.affected ?? 0) > 0;
    }
}
