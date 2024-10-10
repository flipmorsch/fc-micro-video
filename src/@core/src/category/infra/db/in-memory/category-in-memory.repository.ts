import {InMemorySearchableRepository} from '#seedwork/domain'
import {SortDirection} from '#seedwork/domain'
import {Category} from '#category/domain'
import {CategoryRepository} from '#category/domain'

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository.Repository
{
  sortableFields: string[] = ['name', 'created_at']
  protected async applyFilter(
    items: Category[],
    filter: CategoryRepository.Filter
  ): Promise<Category[]> {
    if (!filter) return items

    return items.filter(item =>
      item.props.name.toLowerCase().includes(filter.toLowerCase())
    )
  }

  protected async applySort(
    items: Category[],
    sort: string | null,
    sort_dir: SortDirection | null
  ) {
    return sort
      ? super.applySort(items, sort, sort_dir)
      : super.applySort(items, 'created_at', 'desc')
  }
}
