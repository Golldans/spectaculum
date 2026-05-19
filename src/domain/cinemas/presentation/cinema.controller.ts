import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CinemaService } from '../implementation/cinema.service';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';

@Controller({ path: '/cinema' })
export class CinemaController {
    constructor(private readonly cinemaService: CinemaService) {}

    @Get()
    findAll(@Query('name') name?: string, @Query('location') location?: string) {
        return this.cinemaService.findAll(name, location);
    }

    @Get('cep/:cep')
    lookupCep(@Param('cep') cep: string) {
        return this.cinemaService.lookupCep(cep);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.cinemaService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(
        @Body('name') name: string,
        @Body('location') location: string,
        @Body('cep') cep?: string,
        @Body('street') street?: string,
        @Body('number') number?: string,
        @Body('neighborhood') neighborhood?: string,
        @Body('city') city?: string,
        @Body('state') state?: string,
        @Body('complement') complement?: string,
    ) {
        return this.cinemaService.create({
            name,
            location,
            cep,
            street,
            number,
            neighborhood,
            city,
            state,
            complement,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body('name') name?: string,
        @Body('location') location?: string,
        @Body('cep') cep?: string,
        @Body('street') street?: string,
        @Body('number') number?: string,
        @Body('neighborhood') neighborhood?: string,
        @Body('city') city?: string,
        @Body('state') state?: string,
        @Body('complement') complement?: string,
    ) {
        return this.cinemaService.update({
            id,
            name,
            location,
            cep,
            street,
            number,
            neighborhood,
            city,
            state,
            complement,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.cinemaService.remove(id);
    }
}
