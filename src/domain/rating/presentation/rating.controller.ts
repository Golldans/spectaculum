import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { RatingService } from '../implementation/rating.service';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';

@Controller({ path: '/rating' })
export class RatingController {
    constructor(private readonly ratingService: RatingService) {}

    @Get('movie/:movieId')
    findByMovie(@Param('movieId', ParseIntPipe) movieId: number) {
        return this.ratingService.findByMovie(movieId);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    rate(
        @Body('userId') userId: number,
        @Body('movieId') movieId: number,
        @Body('score') score: number,
    ) {
        return this.ratingService.rate(userId, movieId, score);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.ratingService.remove(id);
    }
}
