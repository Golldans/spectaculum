import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListSchema } from './infra/schema/list.schema';
import { ListRatingSchema } from './infra/schema/list_rating.schema';
import { ListCommentSchema } from './infra/schema/list_comment.schema';
import { ListService } from './implementation/list.service';
import { ListRepository } from './infra/repository/list.repository';
import { ListController } from './presentation/list.controller';
import { MovieSchema } from '../movies/infra/schema/movie.schema';
import { UserSchema } from '../users/infra/schema/user.schema';

@Module({
    imports: [TypeOrmModule.forFeature([ListSchema, MovieSchema, UserSchema, ListRatingSchema, ListCommentSchema])],
    providers: [ListService, ListRepository],
    exports: [ListService],
    controllers: [ListController],
})
export class ListsModule {}
