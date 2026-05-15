import { Injectable } from '@nestjs/common';
import { WatchlistRepository } from '../infra/repository/watchlist.repository';

@Injectable()
export class WatchlistService {
    constructor(private readonly watchlistRepository: WatchlistRepository) {}

    getByUser(userId: number) {
        return this.watchlistRepository.findByUser(userId);
    }

    addItem(userId: number, movieId: number) {
        return this.watchlistRepository.addItem(userId, movieId);
    }

    removeItem(id: number) {
        return this.watchlistRepository.removeItem(id);
    }

    removeByMovieAndUser(userId: number, movieId: number) {
        return this.watchlistRepository.removeByMovieAndUser(userId, movieId);
    }
}
