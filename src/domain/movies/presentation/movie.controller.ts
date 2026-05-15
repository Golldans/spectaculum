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

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.movieService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body('name') name: string) {
        return this.movieService.create(name);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body('name') name: string) {
        return this.movieService.update(id, name);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.movieService.remove(id);
    }
}
