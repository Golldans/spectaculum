import { Module } from '@nestjs/common';
import { datasourceConfigModule } from './shared/config/datasource.config';

@Module({
  imports: [datasourceConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
