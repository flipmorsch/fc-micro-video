import {Entity} from '../entity/entity'
import {NotFoundError} from '../errors/not-found.error'
import {UniqueEntityId} from '../value-objects/unique-entity-id.vo'
import {
  RepositoryInterface,
  SearchParams,
  SearchResult,
  SearchableRepositoryInterface,
} from './repository-contracts'

export abstract class InMemoryRepository<T extends Entity>
  implements RepositoryInterface<T>
{
  items: T[] = []
  async insert(entity: T): Promise<void> {
    this.items.push(entity)
  }
  async findById(id: string | UniqueEntityId): Promise<T> {
    const _id = `${id}`
    return this._get(_id)
  }
  async findAll(): Promise<T[]> {
    return this.items
  }
  async update(entity: T): Promise<void> {
    await this._get(entity.id)
    const index = this.items.findIndex(item => item.id === entity.id)
    this.items[index] = entity
  }
  async delete(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`
    await this._get(_id)
    const index = this.items.findIndex(item => item.id === _id)
    this.items.splice(index, 1)
  }

  protected async _get(id: string): Promise<T> {
    const item = this.items.find(item => item.id === id)
    if (!item) throw new NotFoundError(`Entity not found using ID ${id}`)
    return item
  }
}

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E>
{
  sortableFields: string[] = []
  async search(props: SearchParams): Promise<SearchResult<E>> {
    const itemsFiltered = await this.applyFilter(this.items, props.filter)
    const itemsSorted = await this.applySort(
      itemsFiltered,
      props.sort,
      props.sort_dir
    )
    const itemsPaginated = await this.applyPaginate(
      itemsSorted,
      props.page,
      props.per_page
    )

    return new SearchResult({
      items: itemsPaginated,
      total: itemsFiltered.length,
      current_page: props.page,
      per_page: props.per_page,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter,
    })
  }

  protected abstract applyFilter(
    items: E[],
    filter: SearchParams['filter']
  ): Promise<E[]>

  protected async applySort(
    items: E[],
    sort: SearchParams['sort'],
    sort_dir: SearchParams['sort_dir']
  ): Promise<E[]> {
    if (!sort || !this.sortableFields.includes(sort)) return items

    return [...items].sort((a, b) => {
      if (a.props[sort] < b.props[sort]) {
        return sort_dir === 'asc' ? -1 : 1
      }
      if (a.props[sort] > b.props[sort]) {
        return sort_dir === 'asc' ? 1 : -1
      }
      return 0
    })
  }

  protected async applyPaginate(
    items: E[],
    page: SearchParams['page'],
    per_page: SearchParams['per_page']
  ): Promise<E[]> {
    const start = (page - 1) * per_page
    const end = start + per_page
    return items.slice(start, end)
  }
}
