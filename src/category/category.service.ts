import { Injectable } from "@nestjs/common";

@Injectable()
export default class CategoryService {
    private categories = [
        {
            id: 1,
            description: 'Category 1',
        },
        {
            id: 2,
            description: 'Category 2',
        },
    ];

    getAllCategories() {
        return this.categories;
    }
}