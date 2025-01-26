import { Injectable } from "@nestjs/common";
import { randomInt } from "crypto";

type CategoryEntity = {
    id: number;
    description: string;
};

@Injectable()
export default class CategoryService {
    private categories: CategoryEntity[] = [
        {
            id: 1,
            description: 'Category 1',
        },
        {
            id: 2,
            description: 'Category 2',
        },
        {
            id: 3,
            description: 'Category 3',
        },
    ];

    getOneCategory(data) {
        const category: CategoryEntity | undefined = this.categories.find((category) => category.id == data.id);

        return category;
    }

    createCategory(data) {
        const newCategory: CategoryEntity = {
            id: randomInt(4, 100),
            description: data.description,
        }

        this.categories.push(newCategory);

        return newCategory;
    }
}