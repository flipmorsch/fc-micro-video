import {InMemorySearchableRepository} from '@seedwork/domain/repository/in-memory.repository'
import {Category} from 'category/domain/entities/category'
import CategoryRepository from 'category/domain/repository/category.repository'

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository.Repository
{
  sortableFields: string[]
  protected async applyFilter(
    items: Category[],
    filter: CategoryRepository.Filter
  ): Promise<Category[]> {
    if (!filter) return items

    return items.filter(item =>
      item.props.name.toLowerCase().includes(filter.toLowerCase())
    )
  }
}
