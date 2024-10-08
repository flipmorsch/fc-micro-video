import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import {
  CreateCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase,
  DeleteCategoryUseCase,
} from '@fc/micro-video/category/application';
import { CategoryInMemoryRepository } from '@fc/micro-video/category/infra';
import CategoryRepository from '@fc/micro-video/dist/category/domain/repository/category.repository';

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    {
      provide: 'CategoryInMemoryRepository',
      useClass: CategoryInMemoryRepository,
    },
    {
      provide: CreateCategoryUseCase.UseCase,
      useFactory: (categoryRepository: CategoryRepository.Repository) => {
        return new CreateCategoryUseCase.UseCase(categoryRepository);
      },
      inject: ['CategoryInMemoryRepository'],
    },
    {
      provide: ListCategoriesUseCase.UseCase,
      useFactory: (categoryRepository: CategoryRepository.Repository) => {
        return new ListCategoriesUseCase.UseCase(categoryRepository);
      },
      inject: ['CategoryInMemoryRepository'],
    },
    {
      provide: GetCategoryUseCase.UseCase,
      useFactory: (categoryRepository: CategoryRepository.Repository) => {
        return new GetCategoryUseCase.UseCase(categoryRepository);
      },
      inject: ['CategoryInMemoryRepository'],
    },
    {
      provide: UpdateCategoryUseCase.UseCase,
      useFactory: (categoryRepository: CategoryRepository.Repository) => {
        return new UpdateCategoryUseCase.UseCase(categoryRepository);
      },
      inject: ['CategoryInMemoryRepository'],
    },
    {
      provide: DeleteCategoryUseCase.UseCase,
      useFactory: (categoryRepository: CategoryRepository.Repository) => {
        return new DeleteCategoryUseCase.UseCase(categoryRepository);
      },
      inject: ['CategoryInMemoryRepository'],
    },
  ],
})
export class CategoriesModule {}
