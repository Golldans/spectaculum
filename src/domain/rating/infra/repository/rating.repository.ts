import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RatingSchema } from "../schema/rating.schema";
import { Repository } from "typeorm";

@Injectable()
export class RatingRepository {
    constructor(
        @InjectRepository(RatingSchema)
        private ratingRepository: Repository<RatingSchema>,
    ) {}
}