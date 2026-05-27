import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieSchema } from './infra/schema/movie.schema';
import { MovieService } from './implementation/movie.service';
import { MovieRepository } from './infra/repository/movie.repository';
import { MovieController } from './presentation/movie.controller';

@Module({
    imports: [TypeOrmModule.forFeature([MovieSchema])],
    providers: [MovieService, MovieRepository],
    exports: [MovieService, TypeOrmModule],
    controllers: [MovieController],
})
export class MoviesModule {}
