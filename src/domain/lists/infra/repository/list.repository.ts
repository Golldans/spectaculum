import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListSchema } from '../schema/list.schema';
import { Repository } from 'typeorm';
import { MovieSchema } from '../../../movies/infra/schema/movie.schema';

@Injectable()
export class ListRepository {
    constructor(
        @InjectRepository(ListSchema)
        private repository: Repository<ListSchema>,
        @InjectRepository(MovieSchema)
        private movieRepository: Repository<MovieSchema>,
    ) {}

    async create(data: { name: string; userId: number }): Promise<ListSchema> {
        const list = this.repository.create(data);
        return await this.repository.save(list);
    }

    async findAll(userId?: number): Promise<ListSchema[]> {
        return await this.repository.find({
            where: userId ? { userId } : {},
            relations: ['movies'],
        });
    }

    async findOne(id: number): Promise<ListSchema | null> {
        return await this.repository.findOne({ where: { id }, relations: ['movies'] });
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
}
