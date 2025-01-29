export interface ICategory {
    id: number;
    description: string;
}

export interface IGetOneCategoryStreamRequest {
    id: number;
}

export interface IGetOneCategoryStreamResponse {
    category: ICategory
}