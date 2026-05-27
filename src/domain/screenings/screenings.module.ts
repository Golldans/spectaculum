import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreeningSchema } from './infra/schema/screening.schema';
import { ScreeningRepository } from './infra/repository/screening.repository';
import { ScreeningService } from './implementation/screening.service';
import { ScreeningController } from './presentation/screening.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ScreeningSchema])],
    providers: [ScreeningRepository, ScreeningService],
    exports: [ScreeningService],
    controllers: [ScreeningController],
})
export class ScreeningsModule {}
