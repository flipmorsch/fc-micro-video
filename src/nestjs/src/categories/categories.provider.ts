/* eslint-disable @typescript-eslint/no-namespace */
import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase,
} from '@fc/micro-video/category/application';
import { CategoryInMemoryRepository } from '@fc/micro-video/category/infra';
import { CategoryRepository } from '@fc/micro-video/category/domain';

export namespace CATEGORY_PROVIDERS {
  export namespace REPOSITORIES {
    export const CATEGORY_IN_MEMORY_REPOSITORY = {
      provide: 'CategoryInMemoryRepository',
      useClass: CategoryInMemoryRepository,
    };
  }

  export namespace USECASES {
    export const CREATE_CATEGORY_USECASE = {
      provide: CreateCategoryUseCase.UseCase,
      useFactory: (categoryRepository: CategoryRepository.Repository) => {
        return new CreateCategoryUseCase.UseCase(categoryRepository);
      },
      inject: [REPOSITORIES.CATEGORY_IN_MEMORY_REPOSITORY.provide],
    };
    export const LIST_CATEGORIES_USECASE = {
      provide: ListCategoriesUseCase.UseCase,
      useFactory: (categoryRepository: CategoryRepository.Repository) => {
        return new ListCategoriesUseCase.UseCase(categoryRepository);
      },
      inject: [REPOSITORIES.CATEGORY_IN_MEMORY_REPOSITORY.provide],
    };
    export const GET_CATEGORY_USECASE = {
      provide: GetCategoryUseCase.UseCase,
      useFactory: (categoryRepository: CategoryRepository.Repository) => {
        return new GetCategoryUseCase.UseCase(categoryRepository);
      },
      inject: [REPOSITORIES.CATEGORY_IN_MEMORY_REPOSITORY.provide],
    };
    export const UPDATE_CATEGORY_USECASE = {
      provide: UpdateCategoryUseCase.UseCase,
      useFactory: (categoryRepository: CategoryRepository.Repository) => {
        return new UpdateCategoryUseCase.UseCase(categoryRepository);
      },
      inject: [REPOSITORIES.CATEGORY_IN_MEMORY_REPOSITORY.provide],
    };
    export const DELETE_CATEGORY_USECASE = {
      provide: DeleteCategoryUseCase.UseCase,
      useFactory: (categoryRepository: CategoryRepository.Repository) => {
        return new DeleteCategoryUseCase.UseCase(categoryRepository);
      },
      inject: [REPOSITORIES.CATEGORY_IN_MEMORY_REPOSITORY.provide],
    };
  }
}
