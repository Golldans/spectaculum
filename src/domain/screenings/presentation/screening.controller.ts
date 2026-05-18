import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { ScreeningService } from '../implementation/screening.service';

@Controller({ path: '/screening' })
export class ScreeningController {
    constructor(private readonly screeningService: ScreeningService) {}

    @Get('cinema/:cinemaId')
    findByCinema(@Param('cinemaId', ParseIntPipe) cinemaId: number) {
        return this.screeningService.findByCinema(cinemaId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('notifications')
    notifications(@Req() req: { user: { id: number } }) {
        return this.screeningService.notificationsForUser(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(
        @Body('movieId', ParseIntPipe) movieId: number,
        @Body('cinemaId', ParseIntPipe) cinemaId: number,
        @Body('exhibitionAt') exhibitionAt: string,
    ) {
        return this.screeningService.create(movieId, cinemaId, new Date(exhibitionAt));
    }
}
