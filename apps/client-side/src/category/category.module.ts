import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";

@Module({
    controllers: [CategoryController]
})
export default class CategoryModule {}