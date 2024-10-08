import { CreateCategoryUseCase } from '@fc/micro-video/category/application';

export class CreateCategoryDto implements CreateCategoryUseCase.Input {
  name: string;
  description?: string;
  is_active?: boolean;
}
