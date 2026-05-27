import { Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
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
        @Req() req: any,
    ) {
        return this.userService.sendFriendRequest(id, req.user.id, friendId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id/friends/:friendId')
    removeFriend(
        @Param('id', ParseIntPipe) id: number,
        @Param('friendId', ParseIntPipe) friendId: number,
        @Req() req: any,
    ) {
        return this.userService.removeFriend(id, req.user.id, friendId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/friend-requests/incoming')
    getIncomingFriendRequests(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: any,
    ) {
        return this.userService.getIncomingFriendRequests(id, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/friend-requests/outgoing')
    getOutgoingFriendRequests(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: any,
    ) {
        return this.userService.getOutgoingFriendRequests(id, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/friend-requests/:requestId/accept')
    acceptFriendRequest(
        @Param('id', ParseIntPipe) id: number,
        @Param('requestId', ParseIntPipe) requestId: number,
        @Req() req: any,
    ) {
        return this.userService.acceptFriendRequest(id, req.user.id, requestId);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/friend-requests/:requestId/reject')
    rejectFriendRequest(
        @Param('id', ParseIntPipe) id: number,
        @Param('requestId', ParseIntPipe) requestId: number,
        @Req() req: any,
    ) {
        return this.userService.rejectFriendRequest(id, req.user.id, requestId);
    }
}
