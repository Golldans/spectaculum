import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from '../infra/repository/comment.repository';
import { UserRepository } from '../../users/infra/repository/user.repository';

export interface CommentAuthorDto {
    id: number;
    username: string;
}

export interface CommentDto {
    id: number;
    content: string;
    userId: number;
    movieId: number;
    createdAt: Date;
    updatedAt: Date;
    user?: CommentAuthorDto;
}

@Injectable()
export class CommentService {
    constructor(
        private readonly commentRepository: CommentRepository,
        private readonly userRepository: UserRepository,
    ) {}

    private async withAuthorFallback(comments: CommentDto[]): Promise<CommentDto[]> {
        const missingUserIds = Array.from(
            new Set(
                comments
                    .filter((comment) => !comment.user)
                    .map((comment) => comment.userId),
            ),
        );

        if (!missingUserIds.length) return comments;

        const users = await this.userRepository.findPublicByIds(missingUserIds);
        const usersById = new Map(users.map((user) => [user.id, user]));

        return comments.map((comment) => {
            if (comment.user) return comment;

            const fallbackUser = usersById.get(comment.userId);
            if (!fallbackUser) return comment;

            return {
                ...comment,
                user: fallbackUser,
            };
        });
    }

    async findByMovie(movieId: number) {
        const comments = (await this.commentRepository.findByMovie(movieId)) as unknown as CommentDto[];
        return this.withAuthorFallback(comments);
    }

    async create(content: string, userId: number, movieId: number) {
        const comment = (await this.commentRepository.create({ content, userId, movieId })) as unknown as CommentDto;
        const [enrichedComment] = await this.withAuthorFallback([comment]);
        return enrichedComment;
    }

    async remove(id: number) {
        const deleted = await this.commentRepository.softDelete(id);
        if (!deleted) throw new NotFoundException('Comentário não encontrado');
        return { message: 'Comentário removido' };
    }
}
