import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { MovieService } from '../implementation/movie.service';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';

@Controller({ path: '/movie' })
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @Get()
    findAll(@Query('name') name?: string) {
        return this.movieService.findAll(name);
    }

    @Get('cover-suggestions/search')
    suggestCovers(@Query('name') name: string, @Query('year') year?: string) {
        return this.movieService.suggestCovers(name ?? '', year);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.movieService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(
        @Body('name') name: string,
        @Body('coverUrl') coverUrl?: string,
        @Body('year') year?: string,
        @Body('plot') plot?: string,
        @Body('imdbId') imdbId?: string,
    ) {
        return this.movieService.create(name, coverUrl, year, plot, imdbId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body('name') name: string,
        @Body('coverUrl') coverUrl?: string,
        @Body('year') year?: string,
        @Body('plot') plot?: string,
        @Body('imdbId') imdbId?: string,
    ) {
        return this.movieService.update(id, name, coverUrl, year, plot, imdbId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.movieService.remove(id);
    }
}
