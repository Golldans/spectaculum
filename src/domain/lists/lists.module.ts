import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ListSchema } from "./infra/schema/list.schema";
import { ListService } from "./implementation/list.service";
import { ListRepository } from "./infra/repository/list.repository";
import { ListController } from "./presentation/list.controller";

@Module({
    imports: [TypeOrmModule.forFeature([
        ListSchema,
    ])],
    providers: [ListService, ListRepository],
    exports: [ListService],
    controllers: [ListController]
})
export class ListsModule {}
