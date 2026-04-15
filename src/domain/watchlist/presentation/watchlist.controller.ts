import { Controller } from "@nestjs/common";
import { WatchlistService } from "../implementation/watchlist.service";

@Controller({
    path: "/watchlist"
})
export class WatchListController {
    constructor(
        private readonly watchlistService: WatchlistService,
    ) {}
}