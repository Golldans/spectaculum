import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RatingSchema } from "./infra/schema/rating.schema";
import { RatingRepository } from "./infra/repository/rating.repository";
import { RatingService } from "./implementation/rating.service";
import { RatingController } from "./presentation/rating.controller";

@Module({
    imports: [TypeOrmModule.forFeature([
        RatingSchema,
    ])],
    providers: [RatingService, RatingRepository],
    exports: [RatingService],
    controllers: [RatingController]
})
export class RatingModule {}
