import UseCase from '../../../@seedwork/application/use-case'
import CategoryRepository from '../../domain/repository/category.repository'
import {CategoryOutput} from '../dto/category-output'

export default class GetCategoryUseCase
  implements UseCase<Input, CategoryOutput>
{
  constructor(private categoryRepository: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<CategoryOutput> {
    const entity = await this.categoryRepository.findById(input.id)
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at,
    }
  }
}

export type Input = {
  id: string
}
