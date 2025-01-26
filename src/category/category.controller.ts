import { Controller, Get, Inject } from "@nestjs/common";
import CategoryService from "./category.service";

@Controller()
export class CategoryController {
    constructor(@Inject() private readonly cartegoryService: CategoryService) {}

    @Get()
    getAllCategories() {
        return this.cartegoryService.getAllCategories();
    }
}