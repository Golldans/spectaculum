import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MovieSchema } from "../schema/movie.schema";
import { Repository } from "typeorm";

@Injectable()
export class MovieRepository {
    constructor(
        @InjectRepository(MovieSchema)
        private movieRepository: Repository<MovieSchema>,
    ) {}
}