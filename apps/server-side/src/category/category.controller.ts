import { Controller, Get, Inject } from "@nestjs/common";
import CategoryService from "./category.service";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable, Subject } from "rxjs";
import { ICategory, IGetOneCategoryStreamRequest, IGetOneCategoryStreamResponse } from "./category-proto.interface";

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

    @GrpcStreamMethod('CategoryProtoService', 'GetOneCategoryStream')
    getOneCategoryStream(getOneCategoryStreamRequest: Observable<IGetOneCategoryStreamRequest>): Observable<IGetOneCategoryStreamResponse> {
        const subject = new Subject<IGetOneCategoryStreamResponse>();

        const onNext = (requestDTO) => {
            subject.next({
                category: this.cartegoryService.getOneCategory(requestDTO) as ICategory,
            });
        };

        const onComplete = () => subject.complete();

        getOneCategoryStreamRequest.subscribe({
            next: onNext,
            complete: onComplete,
        });

        return subject.asObservable();
    }
}