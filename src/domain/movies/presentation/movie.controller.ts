import { Controller } from "@nestjs/common";
import { MovieService } from "../implementation/movie.service";

@Controller({
    path: "/movie",
})
export class MovieController {
    constructor(
        private readonly movieService: MovieService,
    ) {}
}