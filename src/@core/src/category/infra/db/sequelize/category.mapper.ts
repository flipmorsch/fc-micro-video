import {Category} from '#category/domain'
import {UniqueEntityId} from '#seedwork/domain'
import {CategoryModel} from './category.model'

export class CategoryModelMapper {
  static toEntity(categoryModel: CategoryModel): Category {
    const {id, ...data} = categoryModel.toJSON()
    return new Category(data, new UniqueEntityId(id))
  }
}
