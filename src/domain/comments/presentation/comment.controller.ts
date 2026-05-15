import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CommentService } from '../implementation/comment.service';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';

@Controller({ path: '/comment' })
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get('movie/:movieId')
    findByMovie(@Param('movieId', ParseIntPipe) movieId: number) {
        return this.commentService.findByMovie(movieId);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(
        @Body('content') content: string,
        @Body('userId') userId: number,
        @Body('movieId') movieId: number,
    ) {
        return this.commentService.create(content, userId, movieId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.commentService.remove(id);
    }
}
