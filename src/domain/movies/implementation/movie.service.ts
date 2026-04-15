import { Injectable } from "@nestjs/common";
import { MovieRepository } from "../infra/repository/movie.repository";

@Injectable()
export class MovieService {
    constructor(
        private readonly movieRepository: MovieRepository,
    ) {}
}