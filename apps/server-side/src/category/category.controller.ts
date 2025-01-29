import { Controller, Get, Inject } from "@nestjs/common";
import CategoryService from "./category.service";
import { GrpcMethod } from "@nestjs/microservices";

@Controller()
export class CategoryController {
    constructor(@Inject() private readonly cartegoryService: CategoryService) {}

    @GrpcMethod('CategoryProtoService', 'GetOneCategory')
    getOneCategory(data) {
        const category = this.cartegoryService.getOneCategory(data);

        return {
            category: category,
        };
    }

    @GrpcMethod('CategoryProtoService', 'CreateCategory')
    createCategory(data) {
        return this.cartegoryService.createCategory(data);
    }
}