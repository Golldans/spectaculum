import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserSchema } from "./infra/schema/user.schema";

@Module({
    imports: [TypeOrmModule.forFeature([
        UserSchema,
    ])],
    providers: [],
    exports: [],
})
export class UsersModule {}
