import { Controller } from "@nestjs/common";
import { CinemaService } from "../implementation/cinema.service";

@Controller({
    path: "/cinema",
})
export class CinemaController {
    constructor(
        private readonly cinemaService: CinemaService,
    ) {}
}