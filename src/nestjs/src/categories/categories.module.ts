import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CATEGORY_PROVIDERS } from './categories.provider';

@Module({
  controllers: [CategoriesController],
  providers: [
    ...Object.values(CATEGORY_PROVIDERS.REPOSITORIES),
    ...Object.values(CATEGORY_PROVIDERS.USECASES),
  ],
})
export class CategoriesModule {}
