import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GetCategoryUseCase } from '@fc/micro-video/category/application'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log(GetCategoryUseCase.UseCase)
    return this.appService.getHello();
  }
}
