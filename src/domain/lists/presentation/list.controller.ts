import { Controller } from "@nestjs/common";
import { ListService } from "../implementation/list.service";

@Controller({
    path: "/list"
})
export class ListController {
    constructor(
        private readonly listService: ListService,
    ) {}
}