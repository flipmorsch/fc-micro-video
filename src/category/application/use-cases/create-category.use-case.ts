import {Category} from '../../domain/entities/category'
import CategoryRepository from '../../domain/repository/category.repository'
import {CategoryOutput} from '../dto/category-output.dto'

export default class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<CategoryOutput> {
    const entity = new Category(input)
    await this.categoryRepository.insert(entity)
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
  name: string
  description?: string
  is_active?: boolean
}
