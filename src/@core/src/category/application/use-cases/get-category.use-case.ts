import UseCase from '../../../@seedwork/application/use-case'
import CategoryRepository from '../../domain/repository/category.repository'
import {CategoryOutput, CategoryOutputMapper} from '../dto/category-output'

export default class GetCategoryUseCase
  implements UseCase<Input, CategoryOutput>
{
  constructor(private categoryRepository: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<CategoryOutput> {
    const entity = await this.categoryRepository.findById(input.id)
    return CategoryOutputMapper.toOutput(entity)
  }
}

export type Input = {
  id: string
}
