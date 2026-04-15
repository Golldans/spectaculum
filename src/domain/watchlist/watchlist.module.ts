import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WatchlistSchema } from "./infra/schema/watchlist.schema";
import { WatchListController } from "./presentation/watchlist.controller";
import { WatchlistService } from "./implementation/watchlist.service";
import { WatchlistRepository } from "./infra/repository/watchlist.repository";

@Module({
    imports: [TypeOrmModule.forFeature([
        WatchlistSchema,
    ])],
    providers: [WatchlistRepository, WatchlistService],
    exports: [WatchlistService],
    controllers: [WatchListController],
})
export class WatchListModule {}
