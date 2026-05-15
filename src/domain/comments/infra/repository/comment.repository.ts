import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentSchema } from '../schema/comment.schema';
import { Repository } from 'typeorm';

@Injectable()
export class CommentRepository {
    constructor(
        @InjectRepository(CommentSchema)
        private readonly repository: Repository<CommentSchema>,
    ) {}

    async findByMovie(movieId: number): Promise<CommentSchema[]> {
        return this.repository.find({ where: { movieId }, order: { createdAt: 'DESC' } });
    }

    async create(data: { content: string; userId: number; movieId: number }): Promise<CommentSchema> {
        const comment = this.repository.create(data);
        return this.repository.save(comment);
    }

    async softDelete(id: number): Promise<boolean> {
        const result = await this.repository.softDelete({ id });
        return (result.affected ?? 0) > 0;
    }
}
