import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ListService } from '../implementation/list.service';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';

@Controller({ path: '/list' })
export class ListController {
    constructor(private readonly listService: ListService) {}

    @Get()
    findAll(@Query('userId') userId?: string) {
        return this.listService.findAll(userId ? parseInt(userId) : undefined);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.listService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body('name') name: string, @Body('userId') userId: number) {
        return this.listService.create(name, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body('name') name: string) {
        return this.listService.update(id, name);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/movies')
    addMovie(@Param('id', ParseIntPipe) id: number, @Body('movieId') movieId: number) {
        return this.listService.addMovie(id, movieId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id/movies/:movieId')
    removeMovie(
        @Param('id', ParseIntPipe) id: number,
        @Param('movieId', ParseIntPipe) movieId: number,
    ) {
        return this.listService.removeMovie(id, movieId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.listService.remove(id);
    }

    // --- Ratings ---

    @Get(':id/ratings')
    getRatings(@Param('id', ParseIntPipe) id: number) {
        return this.listService.getRatings(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/ratings')
    rateList(
        @Param('id', ParseIntPipe) id: number,
        @Body('score') score: number,
        @Req() req: any,
    ) {
        return this.listService.rateList(id, req.user.id, score);
    }

    // --- Comments ---

    @Get(':id/comments')
    getComments(@Param('id', ParseIntPipe) id: number) {
        return this.listService.getComments(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/comments')
    addComment(
        @Param('id', ParseIntPipe) id: number,
        @Body('content') content: string,
        @Req() req: any,
    ) {
        return this.listService.addComment(id, req.user.id, content);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id/comments/:commentId')
    removeComment(
        @Param('id', ParseIntPipe) id: number,
        @Param('commentId', ParseIntPipe) commentId: number,
        @Req() req: any,
    ) {
        return this.listService.removeComment(commentId, req.user.id);
    }
}

}
