import {Category, CategoryRepository} from '#category/domain'
import {NotFoundError, UniqueEntityId} from '#seedwork/domain'
import {CategoryModelMapper} from './category.mapper'
import {CategoryModel} from './category.model'

export class CategorySequelizeRepository
  implements CategoryRepository.Repository
{
  sortableFields: string[] = ['name', 'created_at']

  constructor(private readonly categoryModel: typeof CategoryModel) {}
  async search(
    props: CategoryRepository.SearchParams
  ): Promise<CategoryRepository.SearchResult> {
    throw new Error('Method not implemented.')
  }
  async insert(entity: Category): Promise<void> {
    await this.categoryModel.create(entity.toJSON())
  }
  async findById(id: string | UniqueEntityId): Promise<Category> {
    const _id = `${id}`
    const model = await this._get(_id)
    return CategoryModelMapper.toEntity(model)
  }
  async findAll(): Promise<Category[]> {
    throw new Error('Method not implemented.')
  }
  async update(entity: Category): Promise<void> {
    throw new Error('Method not implemented.')
  }
  async delete(id: string | UniqueEntityId): Promise<void> {
    throw new Error('Method not implemented.')
  }

  private async _get(id: string) {
    return this.categoryModel.findByPk(id, {
      rejectOnEmpty: new NotFoundError(`Entity Not Found using ID ${id}`),
    })
  }
}
