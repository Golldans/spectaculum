import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CinemaSchema } from "./infra/schema/cinema.schema";
import { CinemaService } from "./implementation/cinema.service";
import { CinemaRepository } from "./infra/repository/cinema.repository";
import { CinemaController } from "./presentation/cinema.controller";

@Module({
    imports: [TypeOrmModule.forFeature([
        CinemaSchema,
    ])],
    providers: [CinemaService, CinemaRepository],
    exports: [],
    controllers: [CinemaController],
})
export class CinemasModule {}
