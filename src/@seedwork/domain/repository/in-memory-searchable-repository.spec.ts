import {Entity} from '../entity/entity'
import {InMemorySearchableRepository} from './in-memory.repository'

type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields: string[] = ['name', 'price']

  async applyFilter(
    items: StubEntity[],
    filter: string | null
  ): Promise<StubEntity[]> {
    if (!filter) return items

    return items.filter(
      item =>
        item.props.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.props.price.toString() === filter
    )
  }
}

describe('InMemorySearchableRepository Unit Tests', () => {
  let repository: StubInMemorySearchableRepository
  describe('applyFilter method', () => {
    beforeEach(() => {
      repository = new StubInMemorySearchableRepository()
    })
    test('should return all items when filter is null', async () => {
      const items = [
        new StubEntity({name: 'test', price: 100}),
        new StubEntity({name: 'test2', price: 200}),
      ]
      const spyFilterMethod = jest.spyOn(items, 'filter')
      const result = await repository.applyFilter(items, null)

      expect(result).toStrictEqual(items)
      expect(spyFilterMethod).not.toHaveBeenCalled()
    })

    test('should return filtered items when filter is not null', async () => {
      const items = [
        new StubEntity({name: 'test', price: 100}),
        new StubEntity({name: 'test2', price: 200}),
        new StubEntity({name: 'tedst2', price: 200}),
      ]
      const spyFilterMethod = jest.spyOn(items, 'filter')
      const result = await repository.applyFilter(items, 'test')

      expect(result).toStrictEqual([items[0], items[1]])
      expect(spyFilterMethod).toHaveBeenCalledTimes(1)
    })
  })

  describe('applySort method', () => {
    beforeEach(() => {
      repository = new StubInMemorySearchableRepository()
    })
    test('should return all items when sort is null', async () => {
      const items = [
        new StubEntity({name: 'test', price: 100}),
        new StubEntity({name: 'test2', price: 200}),
      ]
      const spySortMethod = jest.spyOn(items, 'sort')
      const result = await repository['applySort'](items, null, 'asc')

      expect(result).toStrictEqual(items)
      expect(spySortMethod).not.toHaveBeenCalled()
    })

    test('should return sorted items when sort is not null', async () => {
      const items = [
        new StubEntity({name: 'a', price: 100}),
        new StubEntity({name: 'b', price: 200}),
      ]
      const result = await repository['applySort'](items, 'name', 'asc')

      expect(result).toStrictEqual([...items])
    })

    test('should return sorted items in descending order when sort_dir is desc', async () => {
      const items = [
        new StubEntity({name: 'test', price: 100}),
        new StubEntity({name: 'test2', price: 200}),
      ]
      const result = await repository['applySort'](items, 'name', 'desc')

      expect(result).toStrictEqual([items[1], items[0]])
    })
  })

  describe('applyPaginate method', () => {
    beforeEach(() => {
      repository = new StubInMemorySearchableRepository()
    })
    test('should paginate items', async () => {
      const items = [
        new StubEntity({name: 'a', price: 1}),
        new StubEntity({name: 'b', price: 1}),
        new StubEntity({name: 'c', price: 1}),
        new StubEntity({name: 'd', price: 1}),
        new StubEntity({name: 'e', price: 1}),
      ]
      let result = await repository['applyPaginate'](items, 1, 2)
      expect(result).toStrictEqual([items[0], items[1]])

      result = await repository['applyPaginate'](items, 2, 2)
      expect(result).toStrictEqual([items[2], items[3]])

      result = await repository['applyPaginate'](items, 3, 2)
      expect(result).toStrictEqual([items[4]])

      result = await repository['applyPaginate'](items, 4, 2)
      expect(result).toStrictEqual([])
    })
  })
})
