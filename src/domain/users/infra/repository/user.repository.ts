import { Injectable } from '@nestjs/common';
import { UserSchema } from '../schema/user.schema';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserSchema)
        private userRepository: Repository<UserSchema>,
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
        user.friends = [...(user.friends ?? []), friend];
        await this.userRepository.save(user);
    }

    async removeFriend(userId: number, friendId: number): Promise<void> {
        const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['friends'] });
        if (!user) return;
        user.friends = (user.friends ?? []).filter(f => f.id !== friendId);
        await this.userRepository.save(user);
    }

    async softDelete(id: number): Promise<boolean> {
        const result = await this.userRepository.softDelete({ id });
        return (result.affected ?? 0) > 0;
    }
}
