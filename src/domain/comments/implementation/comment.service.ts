import { Injectable } from "@nestjs/common";
import { CommentRepository } from "../infra/repository/comment.repository";

@Injectable()
export class CommentService {
    constructor(
        private readonly commentRepository: CommentRepository,
    ) {}
}