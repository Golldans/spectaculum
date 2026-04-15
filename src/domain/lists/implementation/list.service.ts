import { Injectable } from "@nestjs/common";
import { ListRepository } from "../infra/repository/list.repository";

@Injectable()
export class ListService {
    constructor(
        private readonly listRepository: ListRepository,
    ) {}
}