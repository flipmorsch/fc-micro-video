import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase,
} from '@fc/micro-video/category/application';
import { SearchCategoryDTO } from './dto/search-category.dto';

@Injectable()
export class CategoriesService {
  @Inject(CreateCategoryUseCase.UseCase)
  private createCategoryUseCase: CreateCategoryUseCase.UseCase;

  @Inject(ListCategoriesUseCase.UseCase)
  private listCategoriesUseCase: ListCategoriesUseCase.UseCase;

  @Inject(GetCategoryUseCase.UseCase)
  private getCategoryUseCase: GetCategoryUseCase.UseCase;

  @Inject(UpdateCategoryUseCase.UseCase)
  private updateCategoryUseCase: UpdateCategoryUseCase.UseCase;

  @Inject(DeleteCategoryUseCase.UseCase)
  private deleteCategoryUseCase: DeleteCategoryUseCase.UseCase;

  create(createCategoryDto: CreateCategoryDto) {
    return this.createCategoryUseCase.execute(createCategoryDto);
  }

  search(searchParams: SearchCategoryDTO) {
    return this.listCategoriesUseCase.execute(searchParams);
  }

  findOne(id: string) {
    return this.getCategoryUseCase.execute({ id });
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.updateCategoryUseCase.execute({
      id,
      ...updateCategoryDto,
    });
  }

  delete(id: string) {
    this.deleteCategoryUseCase.execute({ id });
  }
}
