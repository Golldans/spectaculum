import { Controller } from "@nestjs/common";
import { CommentService } from "../implementation/comment.service";

@Controller({
    path: "/comment",
})
export class CommentController {
    constructor(
        private readonly commentService: CommentService,
    ) {}
}