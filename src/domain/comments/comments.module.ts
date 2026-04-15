import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentSchema } from "./infra/schema/comment.schema";
import { CommentService } from "./implementation/comment.service";
import { CommentRepository } from "./infra/repository/comment.repository";
import { CommentController } from "./presentation/comment.controller";

@Module({
    imports: [TypeOrmModule.forFeature([
        CommentSchema,
    ])],
    providers: [CommentService, CommentRepository],
    exports: [CommentService],
    controllers: [CommentController]
})
export class CommentsModule {}
