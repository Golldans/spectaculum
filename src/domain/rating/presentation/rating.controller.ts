import { Controller } from "@nestjs/common";
import { RatingService } from "../implementation/rating.service";

@Controller({
    path: "/rating",
})
export class RatingController {
    constructor(
        private readonly ratingService: RatingService,
    ) {}
}