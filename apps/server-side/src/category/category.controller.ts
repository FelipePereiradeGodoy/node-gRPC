import { Controller, Inject } from "@nestjs/common";
import CategoryService from "./category.service";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable, of, Subject } from "rxjs";
import { ICategory, ICreateCategoryRequest, ICreateCategoryResponse, IGetOneCategoriesRequest, IGetOneCategoryResponse, IGetOneCategoryStreamRequest, IGetOneCategoryStreamResponse } from "../protos/category-proto.interface";

@Controller()
export class CategoryController {
    constructor(@Inject() private readonly cartegoryService: CategoryService) {}

    @GrpcMethod('CategoryProtoService', 'GetOneCategory')
    getOneCategory(payload: IGetOneCategoriesRequest): Observable<IGetOneCategoryResponse> {
        console.log('Recebendo id: '+ payload.id);

        const category = this.cartegoryService.getOneCategory(payload);

        console.log('Encontrou a categoria: ' + category?.description);

        return of({
            category: category as ICategory,
        });
    }

    @GrpcMethod('CategoryProtoService', 'CreateCategory')
    createCategory(payload: ICreateCategoryRequest): Observable<ICreateCategoryResponse> {
        return of(this.cartegoryService.createCategory(payload));
    }

    @GrpcStreamMethod('CategoryProtoService', 'GetOneCategoryStream')
    getOneCategoryStream(getOneCategoryStreamRequest: Observable<IGetOneCategoryStreamRequest>): Observable<IGetOneCategoryStreamResponse> {
        const subject = new Subject<IGetOneCategoryStreamResponse>();

        const onNext = (requestDTO: IGetOneCategoryStreamRequest) => {
            console.log('Processando request: '+ requestDTO.id);

            const category = this.cartegoryService.getOneCategory(requestDTO) as ICategory;

            subject.next({ category });
        };

        const onComplete = () => {
            console.log("Finalizando Stream");
            subject.complete()
        };

        getOneCategoryStreamRequest.subscribe({
            next: onNext,
            complete: onComplete,
        });

        return subject.asObservable();
    }
}