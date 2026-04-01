import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CinemaSchema } from "../schema/cinema.schema";
import { ICreateCinema } from "../../interfaces/ICreateCinema";
import { IFindOneCinema } from "../../interfaces/IFindOneCinema";
import { IFindCinemas } from "../../interfaces/IFindCinemas";
import { IUpdateCinema } from "../../interfaces/IUpdateCinema";
import { ISoftDeleteCinema } from "../../interfaces/ISoftDeleteCinema";

@Injectable()
export class CinemaRepository {
	constructor(
		@InjectRepository(CinemaSchema)
		private cinemaRepository: Repository<CinemaSchema>,
	) {}

	async create(cinema: ICreateCinema): Promise<CinemaSchema> {
		const newCinema = this.cinemaRepository.create(cinema);
		return await this.cinemaRepository.save(newCinema);
	}

	async findOne(cinema: IFindOneCinema): Promise<CinemaSchema | null> {
		return await this.cinemaRepository.findOne({
			where: { id: cinema.id },
		});
	}

	async findAll(filters?: IFindCinemas): Promise<CinemaSchema[]> {
		return await this.cinemaRepository.find({
			where: {
				...(filters?.name ? { name: filters.name } : {}),
				...(filters?.location ? { location: filters.location } : {}),
			},
		});
	}

	async update(cinema: IUpdateCinema): Promise<CinemaSchema | null> {
		const { id, ...cinemaData } = cinema;

		await this.cinemaRepository.update({ id }, cinemaData);

		return await this.findOne({ id });
	}

	async softDelete(cinema: ISoftDeleteCinema): Promise<boolean> {
		const result = await this.cinemaRepository.softDelete({ id: cinema.id });
		return (result.affected ?? 0) > 0;
	}
}
