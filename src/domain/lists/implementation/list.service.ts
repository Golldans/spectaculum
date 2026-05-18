import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ListRepository } from '../infra/repository/list.repository';

@Injectable()
export class ListService {
    constructor(private readonly listRepository: ListRepository) {}

    private async assertOwner(listId: number, userId: number) {
        const list = await this.listRepository.findOne(listId);
        if (!list) throw new NotFoundException('Lista não encontrada');
        if (list.userId !== userId) throw new ForbiddenException('Você não tem permissão para alterar esta lista');
    }

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

    async update(id: number, name: string, userId: number) {
        await this.assertOwner(id, userId);
        const list = await this.listRepository.update(id, name);
        if (!list) throw new NotFoundException('Lista não encontrada');
        return list;
    }

    async addMovie(listId: number, movieId: number, userId: number) {
        await this.assertOwner(listId, userId);
        const list = await this.listRepository.addMovie(listId, movieId);
        if (!list) throw new NotFoundException('Lista ou filme não encontrado');
        return list;
    }

    async removeMovie(listId: number, movieId: number, userId: number) {
        await this.assertOwner(listId, userId);
        const list = await this.listRepository.removeMovie(listId, movieId);
        if (!list) throw new NotFoundException('Lista não encontrada');
        return list;
    }

    async remove(id: number, userId: number) {
        await this.assertOwner(id, userId);
        const deleted = await this.listRepository.softDelete(id);
        if (!deleted) throw new NotFoundException('Lista não encontrada');
        return { message: 'Lista removida' };
    }

    // --- Ratings ---

    getRatings(listId: number) {
        return this.listRepository.findRatings(listId);
    }

    rateList(listId: number, userId: number, score: number) {
        return this.listRepository.upsertRating(listId, userId, score);
    }

    // --- Comments ---

    getComments(listId: number) {
        return this.listRepository.findComments(listId);
    }

    addComment(listId: number, userId: number, content: string) {
        return this.listRepository.createComment(listId, userId, content);
    }

    async removeComment(commentId: number, userId: number) {
        const deleted = await this.listRepository.deleteComment(commentId, userId);
        if (!deleted) throw new ForbiddenException('Comentário não encontrado ou sem permissão');
        return { message: 'Comentário removido' };
    }
}
