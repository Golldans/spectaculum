import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './infra/schema/user.schema';
import { FriendRequestSchema } from './infra/schema/friend_request.schema';
import { UserService } from './implementation/user.service';
import { UserRepository } from './infra/repository/user.repository';
import { userController } from './presentation/user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([UserSchema, FriendRequestSchema])],
    providers: [UserService, UserRepository],
    exports: [UserService, UserRepository],
    controllers: [userController],
})
export class UsersModule {}
