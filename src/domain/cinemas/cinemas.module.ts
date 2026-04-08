import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CinemaSchema } from "./infra/schema/cinema.schema";

@Module({
    imports: [TypeOrmModule.forFeature([
        CinemaSchema,
    ])],
    providers: [],
    exports: [],
})
export class CinemasModule {}
