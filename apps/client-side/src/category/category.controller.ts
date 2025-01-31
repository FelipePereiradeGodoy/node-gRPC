import { Body, Controller, Get, Inject, OnModuleInit, Param, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, ReplaySubject, filter, lastValueFrom, map, toArray } from 'rxjs';
import { ICategoryGRPCService, IGetOneCategoryStreamRequest, IGetOneCategoryStreamResponse } from '../protos/category-proto.interface';
import { IGetCategoriesStreamResponse } from './response/get-categories-stream.response';
import { GetOneCategoryResponse } from './response/get-one-category.response';
import { CreateCategoryRequest } from './request/create-category.request';
import { CreateCategoryResponse } from './response/create-category.response';

@Controller()
export class CategoryController implements OnModuleInit {
  private categoryGRPCService: ICategoryGRPCService;

  constructor(@Inject('CATEGORY_GRPC_CLIENT_TOKEN') private categoryGRPCClient: ClientGrpc) {}

  onModuleInit() {
    this.categoryGRPCService = this.categoryGRPCClient.getService<ICategoryGRPCService>('CategoryProtoService');
  }

  @Get(':id')
  getOneCategory(@Param('id') id: number): GetOneCategoryResponse {
    console.log(id);
    const { category } = this.categoryGRPCService.getOneCategory({ id: id });

    console.log(category);

    const response: GetOneCategoryResponse = {
      ...category
    };
    
    return response;
  }

  @Post()
  createCategory(@Body() payload: CreateCategoryRequest): CreateCategoryResponse {
    const response = this.categoryGRPCService.createCategory(payload);
    return response;
  }

  @Get('list/:ids')
  async getCategoriesStream(@Param('ids') ids: string): Promise<IGetCategoriesStreamResponse[]> {
    const listId = ids.split(',').map(Number);
    
    const subject = new ReplaySubject<IGetOneCategoryStreamRequest>();

    const stream: Observable<IGetOneCategoryStreamResponse> = this.categoryGRPCService.getOneCategoryStream(subject.asObservable());

    stream.subscribe({
      next: (response) => {
        if(!response.category) {
          console.log('Sem resposta');
          return;
        }
      },
      complete: () => console.log("Stream finalizado."),
      error: (error) => console.error("Erro no stream: " + error),
    })

    for (const id of listId) {
      console.log('id: ' + id);
      subject.next({ id: id });

      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    subject.complete();

    const filterdStreamResponse = stream.pipe(
      filter((response) => response.category !== undefined),
      map((response) => {
        return {
          ...response.category
        }
      }),
      toArray(),
    )

    return lastValueFrom(filterdStreamResponse);
  }
}
