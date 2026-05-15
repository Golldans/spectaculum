import { Injectable, NotFoundException } from '@nestjs/common';
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

    async addFriend(userId: number, friendId: number) {
        await this.userRepository.addFriend(userId, friendId);
        return { message: 'Amizade adicionada' };
    }

    async removeFriend(userId: number, friendId: number) {
        await this.userRepository.removeFriend(userId, friendId);
        return { message: 'Amizade removida' };
    }

    async getFriends(userId: number) {
        const user = await this.userRepository.findOne(userId);
        if (!user) throw new NotFoundException('Usuário não encontrado');
        return user.friends ?? [];
    }
}
