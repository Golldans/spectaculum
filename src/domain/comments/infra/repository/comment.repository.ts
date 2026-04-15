import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentSchema } from "../schema/comment.schema";
import { Repository } from "typeorm";

@Injectable()
export class CommentRepository {
    constructor(
        @InjectRepository(CommentSchema)
        private readonly repository: Repository<CommentSchema>,
    ) {}
}