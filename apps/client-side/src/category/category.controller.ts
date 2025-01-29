import { Body, Controller, Get, Inject, OnModuleInit, Param, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface ICategory {
  id: number;
  description: string;
}

interface ICategoryGRPCService {
  getOneCategory(requestDTO: IGetOneCategoriesRequest): Observable<IGetOneCategoryResponse>;
  createCategory(requestDTO: ICreateCategoryRequest): Observable<ICreateCategoryResponse>;
}

interface IGetOneCategoriesRequest {
  id: number;
}

interface IGetOneCategoryResponse {
  category: ICategory;
}

interface ICreateCategoryRequest {
  description: string;
}

interface ICreateCategoryResponse {
  id: number;
  description: string;
}



@Controller()
export class CategoryController implements OnModuleInit {
  private categoryGRPCService: ICategoryGRPCService;

  constructor(@Inject('CATEGORY_GRPC_CLIENT_TOKEN') private categoryGRPCClient: ClientGrpc) {}

  onModuleInit() {
    this.categoryGRPCService = this.categoryGRPCClient.getService<ICategoryGRPCService>('CategoryProtoService');
  }

  @Get(':id')
  getOneCategory(@Param('id') id: number): Observable<IGetOneCategoryResponse> {
    const payload: IGetOneCategoriesRequest = {
      id: id,
    };
    
    return this.categoryGRPCService.getOneCategory(payload);
  }

  @Post()
  createCategory(@Body() payload: ICreateCategoryRequest): Observable<ICreateCategoryResponse> {
    return this.categoryGRPCService.createCategory(payload);
  }
}
