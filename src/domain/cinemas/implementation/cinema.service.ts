import { Injectable, NotFoundException } from '@nestjs/common';
import { CinemaRepository } from '../infra/repository/cinema.repository';
import { ICreateCinema } from '../interfaces/ICreateCinema';
import { IUpdateCinema } from '../interfaces/IUpdateCinema';

@Injectable()
export class CinemaService {
    constructor(private readonly cinemaRepository: CinemaRepository) {}

    findAll(name?: string, location?: string) {
        return this.cinemaRepository.findAll(
            name || location ? { name, location } : undefined,
        );
    }

    async findOne(id: number) {
        const cinema = await this.cinemaRepository.findOne({ id });
        if (!cinema) throw new NotFoundException('Cinema não encontrado');
        return cinema;
    }

    create(data: ICreateCinema) {
        return this.cinemaRepository.create(data);
    }

    async update(data: IUpdateCinema) {
        const cinema = await this.cinemaRepository.update(data);
        if (!cinema) throw new NotFoundException('Cinema não encontrado');
        return cinema;
    }

    async remove(id: number) {
        const deleted = await this.cinemaRepository.softDelete({ id });
        if (!deleted) throw new NotFoundException('Cinema não encontrado');
        return { message: 'Cinema removido' };
    }
}
