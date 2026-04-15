import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ListSchema } from "../schema/list.schema";
import { Repository } from "typeorm";

@Injectable()
export class ListRepository {
    constructor(
        @InjectRepository(ListSchema)
        private repository: Repository<ListSchema>,
    ) {}
}