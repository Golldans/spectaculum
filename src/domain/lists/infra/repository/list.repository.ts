import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListSchema } from '../schema/list.schema';
import { In, Repository } from 'typeorm';
import { MovieSchema } from '../../../movies/infra/schema/movie.schema';
import { ListRatingSchema } from '../schema/list_rating.schema';
import { ListCommentSchema } from '../schema/list_comment.schema';

@Injectable()
export class ListRepository {
    constructor(
        @InjectRepository(ListSchema)
        private repository: Repository<ListSchema>,
        @InjectRepository(MovieSchema)
        private movieRepository: Repository<MovieSchema>,
        @InjectRepository(ListRatingSchema)
        private ratingRepository: Repository<ListRatingSchema>,
        @InjectRepository(ListCommentSchema)
        private commentRepository: Repository<ListCommentSchema>,
    ) {}

    async create(data: { name: string; userId: number }): Promise<ListSchema> {
        const list = this.repository.create(data);
        return await this.repository.save(list);
    }

    async findAll(userId?: number): Promise<(ListSchema & { ratings: ListRatingSchema[] })[]> {
        const lists = await this.repository.find({
            where: userId ? { userId } : {},
            relations: { user: true, movies: true },
        });
        if (!lists.length) return lists as any;
        const ids = lists.map(l => l.id);
        const ratings = await this.ratingRepository.findBy({ listId: In(ids) });
        return lists.map(l => Object.assign(l, { ratings: ratings.filter(r => r.listId === l.id) }));
    }

    async findOne(id: number): Promise<ListSchema | null> {
        return await this.repository.findOne({
            where: { id },
            relations: { user: true, movies: true },
        });
    }

    async update(id: number, name: string): Promise<ListSchema | null> {
        await this.repository.update({ id }, { name });
        return this.findOne(id);
    }

    async addMovie(listId: number, movieId: number): Promise<ListSchema | null> {
        const list = await this.repository.findOne({ where: { id: listId }, relations: ['movies'] });
        const movie = await this.movieRepository.findOne({ where: { id: movieId } });
        if (!list || !movie) return null;
        list.movies = [...(list.movies ?? []), movie];
        return await this.repository.save(list);
    }

    async removeMovie(listId: number, movieId: number): Promise<ListSchema | null> {
        const list = await this.repository.findOne({ where: { id: listId }, relations: ['movies'] });
        if (!list) return null;
        list.movies = (list.movies ?? []).filter(m => m.id !== movieId);
        return await this.repository.save(list);
    }

    async softDelete(id: number): Promise<boolean> {
        const result = await this.repository.softDelete({ id });
        return (result.affected ?? 0) > 0;
    }

    // --- Ratings ---

    async findRatings(listId: number): Promise<ListRatingSchema[]> {
        return this.ratingRepository.findBy({ listId });
    }

    async upsertRating(listId: number, userId: number, score: number): Promise<ListRatingSchema> {
        let rating = await this.ratingRepository.findOne({ where: { listId, userId } });
        if (rating) {
            rating.score = score;
        } else {
            rating = this.ratingRepository.create({ listId, userId, score });
        }
        return this.ratingRepository.save(rating);
    }

    // --- Comments ---

    async findComments(listId: number): Promise<ListCommentSchema[]> {
        return this.commentRepository.find({
            where: { listId },
            relations: { user: true },
            order: { createdAt: 'DESC' },
        });
    }

    async createComment(listId: number, userId: number, content: string): Promise<ListCommentSchema> {
        const comment = this.commentRepository.create({ listId, userId, content });
        const saved = await this.commentRepository.save(comment);
        const withUser = await this.commentRepository.findOne({ where: { id: saved.id }, relations: { user: true } });
        return withUser ?? saved;
    }

    async deleteComment(commentId: number, userId: number): Promise<boolean> {
        const comment = await this.commentRepository.findOne({ where: { id: commentId, userId } });
        if (!comment) return false;
        await this.commentRepository.softDelete({ id: commentId });
        return true;
    }
}
