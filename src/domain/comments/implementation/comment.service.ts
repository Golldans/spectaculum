import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from '../infra/repository/comment.repository';

@Injectable()
export class CommentService {
    constructor(private readonly commentRepository: CommentRepository) {}

    findByMovie(movieId: number) {
        return this.commentRepository.findByMovie(movieId);
    }

    create(content: string, userId: number, movieId: number) {
        return this.commentRepository.create({ content, userId, movieId });
    }

    async remove(id: number) {
        const deleted = await this.commentRepository.softDelete(id);
        if (!deleted) throw new NotFoundException('Comentário não encontrado');
        return { message: 'Comentário removido' };
    }
}
