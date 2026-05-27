import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentSchema } from '../schema/comment.schema';
import { Repository } from 'typeorm';

const commentSelect = {
    id: true,
    content: true,
    userId: true,
    movieId: true,
    createdAt: true,
    updatedAt: true,
    user: {
        id: true,
        username: true,
    },
} as const;

@Injectable()
export class CommentRepository {
    constructor(
        @InjectRepository(CommentSchema)
        private readonly repository: Repository<CommentSchema>,
    ) {}

    async findByMovie(movieId: number): Promise<CommentSchema[]> {
        return this.repository.find({
            where: { movieId },
            relations: { user: true },
            select: commentSelect,
            order: { createdAt: 'DESC' },
        });
    }

    async create(data: { content: string; userId: number; movieId: number }): Promise<CommentSchema> {
        const comment = this.repository.create(data);
        const saved = await this.repository.save(comment);
        const withAuthor = await this.repository.findOne({
            where: { id: saved.id },
            relations: { user: true },
            select: commentSelect,
        });

        return withAuthor ?? saved;
    }

    async softDelete(id: number): Promise<boolean> {
        const result = await this.repository.softDelete({ id });
        return (result.affected ?? 0) > 0;
    }
}
