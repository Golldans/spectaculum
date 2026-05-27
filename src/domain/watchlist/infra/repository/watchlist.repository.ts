import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WatchlistSchema } from '../schema/watchlist.schema';
import { Repository } from 'typeorm';

@Injectable()
export class WatchlistRepository {
    constructor(
        @InjectRepository(WatchlistSchema)
        private watchlistRepository: Repository<WatchlistSchema>,
    ) {}

    async findByUser(userId: number): Promise<WatchlistSchema[]> {
        return this.watchlistRepository.find({ where: { userId } });
    }

    async addItem(userId: number, movieId: number): Promise<WatchlistSchema> {
        const existing = await this.watchlistRepository.findOne({ where: { userId, movieId } });
        if (existing) return existing;
        const item = this.watchlistRepository.create({ userId, movieId });
        return this.watchlistRepository.save(item);
    }

    async removeItem(id: number): Promise<boolean> {
        const result = await this.watchlistRepository.softDelete({ id });
        return (result.affected ?? 0) > 0;
    }

    async removeByMovieAndUser(userId: number, movieId: number): Promise<boolean> {
        const result = await this.watchlistRepository.softDelete({ userId, movieId });
        return (result.affected ?? 0) > 0;
    }
}
