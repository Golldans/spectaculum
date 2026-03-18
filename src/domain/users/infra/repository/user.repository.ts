import { Injectable } from "@nestjs/common";
import { UserSchema } from "../schema/user.schema";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserSchema)
        private userRepository: Repository<UserSchema>,
    ) {}
}