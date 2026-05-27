import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../infra/repository/user.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    findAll() {
        return this.userRepository.findAll();
    }

    async findOne(id: number) {
        const user = await this.userRepository.findOne(id);
        if (!user) throw new NotFoundException('Usuário não encontrado');
        return user;
    }

    private ensureSelf(pathUserId: number, authUserId: number) {
        if (pathUserId !== authUserId) {
            throw new ForbiddenException('Você não tem permissão para executar esta ação');
        }
    }

    async sendFriendRequest(pathUserId: number, authUserId: number, friendId: number) {
        this.ensureSelf(pathUserId, authUserId);
        if (authUserId === friendId) throw new BadRequestException('Você não pode adicionar a si mesmo');

        const [fromUser, toUser] = await Promise.all([
            this.userRepository.findOne(authUserId),
            this.userRepository.findOne(friendId),
        ]);

        if (!fromUser || !toUser) throw new NotFoundException('Usuário não encontrado');

        const alreadyFriends = await this.userRepository.areFriends(authUserId, friendId);
        if (alreadyFriends) throw new BadRequestException('Vocês já são amigos');

        const pending = await this.userRepository.findPendingFriendRequestBetween(authUserId, friendId);
        if (pending) throw new BadRequestException('Já existe solicitação pendente entre vocês');

        const request = await this.userRepository.createFriendRequest(authUserId, friendId);
        return { message: 'Solicitação enviada', request };
    }

    async removeFriend(pathUserId: number, authUserId: number, friendId: number) {
        this.ensureSelf(pathUserId, authUserId);
        await this.userRepository.removeFriend(authUserId, friendId);
        return { message: 'Amizade removida' };
    }

    async getFriends(userId: number) {
        const user = await this.userRepository.findOne(userId);
        if (!user) throw new NotFoundException('Usuário não encontrado');
        return user.friends ?? [];
    }

    async getIncomingFriendRequests(pathUserId: number, authUserId: number) {
        this.ensureSelf(pathUserId, authUserId);
        const requests = await this.userRepository.getIncomingFriendRequests(authUserId);

        const userIds = [...new Set(requests.map((request) => request.requesterId))];
        const users = await this.userRepository.findPublicByIds(userIds);
        const byId = new Map(users.map((user) => [user.id, user]));

        return requests.map((request) => ({
            id: request.id,
            requesterId: request.requesterId,
            receiverId: request.receiverId,
            status: request.status,
            createdAt: request.createdAt,
            requester: byId.get(request.requesterId),
        }));
    }

    async getOutgoingFriendRequests(pathUserId: number, authUserId: number) {
        this.ensureSelf(pathUserId, authUserId);
        const requests = await this.userRepository.getOutgoingFriendRequests(authUserId);

        const userIds = [...new Set(requests.map((request) => request.receiverId))];
        const users = await this.userRepository.findPublicByIds(userIds);
        const byId = new Map(users.map((user) => [user.id, user]));

        return requests.map((request) => ({
            id: request.id,
            requesterId: request.requesterId,
            receiverId: request.receiverId,
            status: request.status,
            createdAt: request.createdAt,
            receiver: byId.get(request.receiverId),
        }));
    }

    async acceptFriendRequest(pathUserId: number, authUserId: number, requestId: number) {
        this.ensureSelf(pathUserId, authUserId);

        const request = await this.userRepository.findFriendRequestById(requestId);
        if (!request || request.status !== 'pending') {
            throw new NotFoundException('Solicitação não encontrada');
        }
        if (request.receiverId !== authUserId) {
            throw new ForbiddenException('Você não pode aceitar esta solicitação');
        }

        await this.userRepository.addFriend(request.requesterId, request.receiverId);
        await this.userRepository.updateFriendRequestStatus(request.id, 'accepted');
        return { message: 'Solicitação aceita' };
    }

    async rejectFriendRequest(pathUserId: number, authUserId: number, requestId: number) {
        this.ensureSelf(pathUserId, authUserId);

        const request = await this.userRepository.findFriendRequestById(requestId);
        if (!request || request.status !== 'pending') {
            throw new NotFoundException('Solicitação não encontrada');
        }
        if (request.receiverId !== authUserId) {
            throw new ForbiddenException('Você não pode recusar esta solicitação');
        }

        await this.userRepository.updateFriendRequestStatus(request.id, 'rejected');
        return { message: 'Solicitação recusada' };
    }
}
