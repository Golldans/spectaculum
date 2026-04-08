import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ListSchema } from "./infra/schema/list.schema";

@Module({
    imports: [TypeOrmModule.forFeature([
        ListSchema,
    ])],
    providers: [],
    exports: [],
})
export class ListsModule {}
