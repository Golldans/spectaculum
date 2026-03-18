import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { WatchlistSchema } from "../schema/watchlist.schema";
import { Repository } from "typeorm";

@Injectable()
export class WatchlistRepository {
    constructor(
        @InjectRepository(WatchlistSchema)
        private watchlistRepository: Repository<WatchlistSchema>,
    ) {}
}
