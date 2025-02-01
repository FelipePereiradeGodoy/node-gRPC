import { Body, Controller, Get, Inject, OnModuleInit, Param, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, ReplaySubject, filter, firstValueFrom, lastValueFrom, map, toArray } from 'rxjs';
import { ICategoryGRPCService, ICreateCategoryRequest, ICreateCategoryResponse, IGetOneCategoryResponse, IGetOneCategoryStreamRequest, IGetOneCategoryStreamResponse } from '../protos/category-proto.interface';

@Controller()
export class CategoryController implements OnModuleInit {
  private categoryGRPCService: ICategoryGRPCService;

  constructor(@Inject('CATEGORY_GRPC_CLIENT_TOKEN') private categoryGRPCClient: ClientGrpc) {}

  onModuleInit() {
    this.categoryGRPCService = this.categoryGRPCClient.getService<ICategoryGRPCService>('CategoryProtoService');
  }

  @Get(':id')
  async getOneCategory(@Param('id') id: number): Promise<IGetOneCategoryResponse> {
    console.log('Id Recebido: ' + id);

    const response = await firstValueFrom(this.categoryGRPCService.getOneCategory({ id: id }));
    
    console.log('Categoria encontrada: '+ response.category.description);

    return response;
  }

  @Post()
  async createCategory(@Body() payload: ICreateCategoryRequest): Promise<ICreateCategoryResponse> {
    console.log('Criando categoria: '+ payload.description);

    const response = await firstValueFrom(this.categoryGRPCService.createCategory(payload));

    console.log('Id criado: ' + response.id);

    return response;
  }

  @Get('list/:ids')
  async getCategoriesStream(@Param('ids') ids: string): Promise<IGetOneCategoryStreamResponse[]> {
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
      toArray(),
    )

    return lastValueFrom(filterdStreamResponse);
  }
}
