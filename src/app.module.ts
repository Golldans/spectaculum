import { Module } from '@nestjs/common';
import { DatasourceConfigModule } from './shared/config/datasource.config';
import { AuthModule } from './domain/auth/auth.module';
import { CinemasModule } from './domain/cinemas/cinemas.module';
import { CommentsModule } from './domain/comments/comments.module';
import { ListsModule } from './domain/lists/lists.module';
import { LogsModule } from './domain/logs/logs.module';
import { MoviesModule } from './domain/movies/movies.module';
import { RatingModule } from './domain/rating/rating.module';
import { UsersModule } from './domain/users/users.module';
import { WatchListModule } from './domain/watchlist/watchlist.module';
import { ScreeningsModule } from './domain/screenings/screenings.module';

@Module({
  imports: [DatasourceConfigModule, AuthModule, CinemasModule, CommentsModule, ListsModule, LogsModule, MoviesModule, RatingModule, UsersModule, WatchListModule, ScreeningsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
