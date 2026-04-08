import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LogSchema } from "./infra/schema/log.schema";

@Module({
    imports: [TypeOrmModule.forFeature([
        LogSchema,
    ])],
    providers: [],
    exports: [],
})
export class LogsModule {}
