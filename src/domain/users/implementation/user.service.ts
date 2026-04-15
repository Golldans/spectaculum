import { Injectable } from "@nestjs/common";
import { UserRepository } from "../infra/repository/user.repository";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    
}