import { Injectable } from '@nestjs/common';
import { UserSchema } from '../schema/user.schema';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendRequestSchema } from '../schema/friend_request.schema';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserSchema)
        private userRepository: Repository<UserSchema>,
        @InjectRepository(FriendRequestSchema)
        private friendRequestRepository: Repository<FriendRequestSchema>,
    ) {}

    async create(data: { username: string; email: string; password: string }): Promise<UserSchema> {
        const user = this.userRepository.create(data);
        return await this.userRepository.save(user);
    }

    async findAll(): Promise<UserSchema[]> {
        return await this.userRepository.find();
    }

    async findOne(id: number): Promise<UserSchema | null> {
        return await this.userRepository.findOne({ where: { id }, relations: ['friends'] });
    }

    async findByEmail(email: string): Promise<UserSchema | null> {
        return await this.userRepository.findOne({ where: { email } });
    }

    async findByEmailWithPassword(email: string): Promise<UserSchema | null> {
        return await this.userRepository
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', { email })
            .getOne();
    }

    async findPublicByIds(ids: number[]): Promise<Array<{ id: number; username: string }>> {
        if (!ids.length) return [];

        const users = await this.userRepository
            .createQueryBuilder('user')
            .withDeleted()
            .select(['user.id', 'user.username'])
            .where('user.id IN (:...ids)', { ids })
            .getMany();

        return users.map((user) => ({ id: user.id, username: user.username }));
    }

    async addFriend(userId: number, friendId: number): Promise<void> {
        const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['friends'] });
        const friend = await this.userRepository.findOne({ where: { id: friendId } });
        if (!user || !friend) return;
        if ((user.friends ?? []).some((f) => f.id === friendId)) return;
        user.friends = [...(user.friends ?? []), friend];
        await this.userRepository.save(user);

        const reciprocal = await this.userRepository.findOne({ where: { id: friendId }, relations: ['friends'] });
        if (!reciprocal) return;
        if ((reciprocal.friends ?? []).some((f) => f.id === userId)) return;
        reciprocal.friends = [...(reciprocal.friends ?? []), user];
        await this.userRepository.save(reciprocal);
    }

    async removeFriend(userId: number, friendId: number): Promise<void> {
        const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['friends'] });
        if (!user) return;
        user.friends = (user.friends ?? []).filter(f => f.id !== friendId);
        await this.userRepository.save(user);

        const reciprocal = await this.userRepository.findOne({ where: { id: friendId }, relations: ['friends'] });
        if (!reciprocal) return;
        reciprocal.friends = (reciprocal.friends ?? []).filter((f) => f.id !== userId);
        await this.userRepository.save(reciprocal);
    }

    async findFriendRequestById(id: number): Promise<FriendRequestSchema | null> {
        return this.friendRequestRepository.findOne({ where: { id } });
    }

    async findPendingFriendRequestBetween(userA: number, userB: number): Promise<FriendRequestSchema | null> {
        return this.friendRequestRepository
            .createQueryBuilder('fr')
            .where('fr.status = :status', { status: 'pending' })
            .andWhere(
                '((fr.requester_id = :userA AND fr.receiver_id = :userB) OR (fr.requester_id = :userB AND fr.receiver_id = :userA))',
                { userA, userB },
            )
            .getOne();
    }

    async createFriendRequest(requesterId: number, receiverId: number): Promise<FriendRequestSchema> {
        const request = this.friendRequestRepository.create({ requesterId, receiverId, status: 'pending' });
        return this.friendRequestRepository.save(request);
    }

    async updateFriendRequestStatus(id: number, status: 'accepted' | 'rejected'): Promise<FriendRequestSchema | null> {
        await this.friendRequestRepository.update({ id }, { status });
        return this.findFriendRequestById(id);
    }

    async getIncomingFriendRequests(userId: number): Promise<FriendRequestSchema[]> {
        return this.friendRequestRepository.find({
            where: { receiverId: userId, status: 'pending' },
            order: { createdAt: 'DESC' },
        });
    }

    async getOutgoingFriendRequests(userId: number): Promise<FriendRequestSchema[]> {
        return this.friendRequestRepository.find({
            where: { requesterId: userId, status: 'pending' },
            order: { createdAt: 'DESC' },
        });
    }

    async areFriends(userId: number, otherUserId: number): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['friends'] });
        if (!user) return false;
        return (user.friends ?? []).some((f) => f.id === otherUserId);
    }

    async softDelete(id: number): Promise<boolean> {
        const result = await this.userRepository.softDelete({ id });
        return (result.affected ?? 0) > 0;
    }
}
