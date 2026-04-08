import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RatingSchema } from "./infra/schema/rating.schema";

@Module({
    imports: [TypeOrmModule.forFeature([
        RatingSchema,
    ])],
    providers: [],
    exports: [],
})
export class RatingModule {}
