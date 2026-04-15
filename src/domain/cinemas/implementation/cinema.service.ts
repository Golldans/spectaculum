import { Injectable } from "@nestjs/common";
import { CinemaRepository } from "../infra/repository/cinema.repository";

@Injectable()
export class CinemaService {
    constructor(
        private readonly cinemaRepository: CinemaRepository,
    ) {}
}