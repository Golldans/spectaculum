import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LogSchema } from "../schema/log.schema";
import { Repository } from "typeorm";

@Injectable()
export class LogRepository {
    constructor(
        @InjectRepository(LogSchema)
        private readonly repository: Repository<LogSchema>
    ) {}
}