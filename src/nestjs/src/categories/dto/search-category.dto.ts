import { ListCategoriesUseCase } from '@fc/micro-video/category/application';
import { SortDirection } from '@fc/micro-video/src/@seedwork/domain/repository/repository-contracts';

export class SearchCategoryDTO implements ListCategoriesUseCase.Input {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  filter?: string;
}
