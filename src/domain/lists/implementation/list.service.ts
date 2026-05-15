import { Injectable, NotFoundException } from '@nestjs/common';
import { ListRepository } from '../infra/repository/list.repository';

@Injectable()
export class ListService {
    constructor(private readonly listRepository: ListRepository) {}

    findAll(userId?: number) {
        return this.listRepository.findAll(userId);
    }

    async findOne(id: number) {
        const list = await this.listRepository.findOne(id);
        if (!list) throw new NotFoundException('Lista não encontrada');
        return list;
    }

    create(name: string, userId: number) {
        return this.listRepository.create({ name, userId });
    }

    async update(id: number, name: string) {
        const list = await this.listRepository.update(id, name);
        if (!list) throw new NotFoundException('Lista não encontrada');
        return list;
    }

    async addMovie(listId: number, movieId: number) {
        const list = await this.listRepository.addMovie(listId, movieId);
        if (!list) throw new NotFoundException('Lista ou filme não encontrado');
        return list;
    }

    async removeMovie(listId: number, movieId: number) {
        const list = await this.listRepository.removeMovie(listId, movieId);
        if (!list) throw new NotFoundException('Lista não encontrada');
        return list;
    }

    async remove(id: number) {
        const deleted = await this.listRepository.softDelete(id);
        if (!deleted) throw new NotFoundException('Lista não encontrada');
        return { message: 'Lista removida' };
    }
}
