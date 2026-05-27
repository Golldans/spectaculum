import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MovieSchema } from "../schema/movie.schema";
import { Repository } from "typeorm";
import { ICreateMovie } from "../../interfaces/ICreateMovie";
import { IFindOneMovie } from "../../interfaces/IFindOneMovie";
import { IFindMovies } from "../../interfaces/IFindMovies";
import { IUpdateMovie } from "../../interfaces/IUpdateMovie";
import { ISoftDeleteMovie } from "../../interfaces/ISoftDeleteMovie";

@Injectable()
export class MovieRepository {
    constructor(
        @InjectRepository(MovieSchema)
        private movieRepository: Repository<MovieSchema>,
    ) {}

    async create(movie: ICreateMovie): Promise<MovieSchema> {
        const newMovie = this.movieRepository.create(movie);
        return await this.movieRepository.save(newMovie);
    }

    async findOne(movie: IFindOneMovie): Promise<MovieSchema | null> {
        return await this.movieRepository.findOne({
            where: { id: movie.id },
        });
    }

    async findAll(filters?: IFindMovies): Promise<MovieSchema[]> {
        return await this.movieRepository.find({
            where: {
                ...(filters?.name ? { name: filters.name } : {}),
            },
        });
    }

    async update(movie: IUpdateMovie): Promise<MovieSchema | null> {
        const { id, ...movieData } = movie;

        await this.movieRepository.update({ id }, movieData);

        return await this.findOne({ id });
    }

    async softDelete(movie: ISoftDeleteMovie): Promise<boolean> {
        const result = await this.movieRepository.softDelete({ id: movie.id });
        return (result.affected ?? 0) > 0;
    }
}