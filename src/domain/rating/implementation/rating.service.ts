import { Injectable } from "@nestjs/common";
import { RatingRepository } from "../infra/repository/rating.repository";

@Injectable()
export class RatingService {
    constructor(
        private readonly ratingRepository: RatingRepository,
    ) {}
}