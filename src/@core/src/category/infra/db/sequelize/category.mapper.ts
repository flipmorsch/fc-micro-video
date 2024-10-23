import {Category} from '#category/domain'
import {
  EntityValidationError,
  LoadEntityError,
  UniqueEntityId,
} from '#seedwork/domain'
import {CategoryModel} from './category.model'

export class CategoryModelMapper {
  static toEntity(categoryModel: CategoryModel): Category {
    const {id, ...data} = categoryModel.toJSON()
    try {
      return new Category(data, new UniqueEntityId(id))
    } catch (error) {
      if (error instanceof EntityValidationError) {
        throw new LoadEntityError(error.error)
      }

      throw error
    }
  }
}
