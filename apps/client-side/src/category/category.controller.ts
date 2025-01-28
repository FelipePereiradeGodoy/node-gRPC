import { Controller, Get } from '@nestjs/common';

@Controller()
export class CategoryController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
