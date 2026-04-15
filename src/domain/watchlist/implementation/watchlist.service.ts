import { Injectable } from "@nestjs/common";
import { WatchlistRepository } from "../infra/repository/watchlist.repository";

@Injectable()
export class WatchlistService {
    constructor(
        private readonly watchlistRepository: WatchlistRepository,
    ) {}
}