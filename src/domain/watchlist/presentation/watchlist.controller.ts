import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { WatchlistService } from '../implementation/watchlist.service';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';

@Controller({ path: '/watchlist' })
export class WatchListController {
    constructor(private readonly watchlistService: WatchlistService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getByUser(@Query('userId', ParseIntPipe) userId: number) {
        return this.watchlistService.getByUser(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    addItem(@Body('userId') userId: number, @Body('movieId') movieId: number) {
        return this.watchlistService.addItem(userId, movieId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    removeItem(@Param('id', ParseIntPipe) id: number) {
        return this.watchlistService.removeItem(id);
    }
}
