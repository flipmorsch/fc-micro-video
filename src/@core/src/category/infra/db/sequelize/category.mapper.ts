import {Category} from '#category/domain'
import {CategoryModel} from './category.model'

export class CategoryModelMapper {
  static toEntity(categoryModel: CategoryModel): Category {
    const {id, ...data} = categoryModel.toJSON()
    return new Category(data, id as any)
  }
}
