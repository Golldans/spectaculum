import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentSchema } from "./infra/schema/comment.schema";

@Module({
    imports: [TypeOrmModule.forFeature([
        CommentSchema,
    ])],
    providers: [],
    exports: [],
})
export class CommentsModule {}
