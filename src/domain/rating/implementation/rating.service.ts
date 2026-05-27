import { Injectable, NotFoundException } from '@nestjs/common';
import { RatingRepository } from '../infra/repository/rating.repository';

@Injectable()
export class RatingService {
    constructor(private readonly ratingRepository: RatingRepository) {}

    findByMovie(movieId: number) {
        return this.ratingRepository.findByMovie(movieId);
    }

    rate(userId: number, movieId: number, score: number) {
        return this.ratingRepository.upsert({ userId, movieId, score });
    }

    async remove(id: number) {
        const deleted = await this.ratingRepository.softDelete(id);
        if (!deleted) throw new NotFoundException('Avaliação não encontrada');
        return { message: 'Avaliação removida' };
    }
}
