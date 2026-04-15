import { Controller } from "@nestjs/common";
import { UserService } from "../implementation/user.service";

@Controller({
    path: "/users"
})
export class userController {
    constructor(
        private readonly userService: UserService,
    ) {}
    
}