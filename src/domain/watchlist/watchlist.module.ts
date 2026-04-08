import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WatchlistSchema } from "./infra/schema/watchlist.schema";

@Module({
    imports: [TypeOrmModule.forFeature([
        WatchlistSchema,
    ])],
    providers: [],
    exports: [],
})
export class WatchListModule {}
