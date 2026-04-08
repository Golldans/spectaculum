import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MovieSchema } from "./infra/schema/movie.schema";

@Module({
    imports: [TypeOrmModule.forFeature([
        MovieSchema,
    ])],
    providers: [],
    exports: [],
})
export class MoviesModule {}
