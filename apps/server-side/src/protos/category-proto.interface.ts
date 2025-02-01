import { Observable } from "rxjs";

export interface ICategory {
  id: number;
  description: string;
}

export interface ICategoryGRPCService {
  getOneCategory(requestDTO: IGetOneCategoriesRequest): Observable<IGetOneCategoryResponse>;
  createCategory(requestDTO: ICreateCategoryRequest): Observable<ICreateCategoryResponse>;
  getOneCategoryStream(requestDTO: Observable<IGetOneCategoryStreamRequest>): Observable<IGetOneCategoryStreamResponse>;
}

export interface IGetOneCategoriesRequest {
  id: number;
}

export interface IGetOneCategoryResponse {
  category: ICategory;
}

export interface ICreateCategoryRequest {
  description: string;
}

export interface ICreateCategoryResponse {
  id: number;
  description: string;
}

export interface IGetOneCategoryStreamRequest {
  id: number;
}

export interface IGetOneCategoryStreamResponse {
  category: ICategory;
}