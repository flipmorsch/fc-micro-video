import DefaultUseCase from '../../../@seedwork/application/use-case'
import CategoryRepository from '../../domain/repository/category.repository'
import {CategoryOutput, CategoryOutputMapper} from '../dto/category-output'

export namespace UpdateCategoryUseCase {
  export class UseCase implements DefaultUseCase<Input, CategoryOutput> {
    constructor(
      private readonly categoryRepository: CategoryRepository.Repository
    ) {}

    async execute(input: Input): Promise<CategoryOutput> {
      const entity = await this.categoryRepository.findById(input.id)
      entity.update(input.name, input.description)
      if (input.is_active === true) entity.activate()
      if (input.is_active === false) entity.deactivate()
      await this.categoryRepository.update(entity)
      return CategoryOutputMapper.toOutput(entity)
    }
  }

  export type Input = {
    id: string
    name: string
    description?: string
    is_active?: boolean
  }
}
