import { Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../implementation/user.service';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';

@Controller({ path: '/users' })
export class userController {
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/friends')
    getFriends(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getFriends(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/friends/:friendId')
    addFriend(
        @Param('id', ParseIntPipe) id: number,
        @Param('friendId', ParseIntPipe) friendId: number,
    ) {
        return this.userService.addFriend(id, friendId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id/friends/:friendId')
    removeFriend(
        @Param('id', ParseIntPipe) id: number,
        @Param('friendId', ParseIntPipe) friendId: number,
    ) {
        return this.userService.removeFriend(id, friendId);
    }
}
