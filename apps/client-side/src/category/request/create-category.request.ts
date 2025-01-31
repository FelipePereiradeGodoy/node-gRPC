import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryRequest {
    @IsNotEmpty()
    @IsString()
    description: string;
}