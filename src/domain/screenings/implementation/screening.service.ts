import { Injectable } from '@nestjs/common';
import { ScreeningRepository } from '../infra/repository/screening.repository';

@Injectable()
export class ScreeningService {
    constructor(private readonly screeningRepository: ScreeningRepository) {}

    create(movieId: number, cinemaId: number, exhibitionAt: Date) {
        return this.screeningRepository.create({ movieId, cinemaId, exhibitionAt });
    }

    findByCinema(cinemaId: number) {
        return this.screeningRepository.findByCinema(cinemaId);
    }

    notificationsForUser(userId: number) {
        return this.screeningRepository.findUpcomingNotificationsByUser(userId);
    }
}
