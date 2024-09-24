import {Entity} from '../entity/entity'
import {InMemorySearchableRepository} from './in-memory.repository'
import {SearchParams, SearchResult} from './repository-contracts'

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

  describe('search method', () => {
    test('should apply only paginate when other params are null', async () => {
      const entity = new StubEntity({name: 'a', price: 1})
      const items = Array(16).fill(entity)
      repository.items = items
      const result = await repository.search(new SearchParams())
      expect(result).toStrictEqual(
        new SearchResult({
          items: Array(15).fill(entity),
          total: 16,
          current_page: 1,
          per_page: 15,
          sort: null,
          sort_dir: null,
          filter: null,
        })
      )
    })

    test('should apply paginate and filter', async () => {
      const items = [
        new StubEntity({name: 'test', price: 100}),
        new StubEntity({name: 'a', price: 200}),
        new StubEntity({name: 'TeSt', price: 200}),
        new StubEntity({name: 'TEST', price: 200}),
      ]
      repository.items = items
      let result = await repository.search(
        new SearchParams({page: 1, per_page: 2, filter: 'TEST'})
      )
      expect(result).toStrictEqual(
        new SearchResult({
          items: [items[0], items[2]],
          total: 3,
          current_page: 1,
          per_page: 2,
          sort: null,
          sort_dir: null,
          filter: 'TEST',
        })
      )

      result = await repository.search(
        new SearchParams({page: 2, per_page: 2, filter: 'TEST'})
      )
      expect(result).toStrictEqual(
        new SearchResult({
          items: [items[3]],
          total: 3,
          current_page: 2,
          per_page: 2,
          sort: null,
          sort_dir: null,
          filter: 'TEST',
        })
      )
    })

    test('should apply paginate and sort', async () => {
      const items = [
        new StubEntity({name: 'b', price: 100}),
        new StubEntity({name: 'a', price: 200}),
        new StubEntity({name: 'd', price: 100}),
        new StubEntity({name: 'e', price: 200}),
        new StubEntity({name: 'c', price: 200}),
      ]
      repository.items = items

      const arrange = [
        {
          params: new SearchParams({page: 1, per_page: 2, sort: 'name'}),
          expected: new SearchResult({
            items: [items[1], items[0]],
            total: 5,
            current_page: 1,
            per_page: 2,
            sort: 'name',
            sort_dir: 'asc',
            filter: null,
          }),
        },
        {
          params: new SearchParams({page: 2, per_page: 2, sort: 'name'}),
          expected: new SearchResult({
            items: [items[4], items[2]],
            total: 5,
            current_page: 2,
            per_page: 2,
            sort: 'name',
            sort_dir: 'asc',
            filter: null,
          }),
        },
        {
          params: new SearchParams({page: 3, per_page: 2, sort: 'name'}),
          expected: new SearchResult({
            items: [items[3]],
            total: 5,
            current_page: 3,
            per_page: 2,
            sort: 'name',
            sort_dir: 'asc',
            filter: null,
          }),
        },
        {
          params: new SearchParams({sort: 'name', sort_dir: 'desc'}),
          expected: new SearchResult({
            items: [items[3], items[2], items[4], items[0], items[1]],
            total: 5,
            current_page: 1,
            per_page: 15,
            sort: 'name',
            sort_dir: 'desc',
            filter: null,
          }),
        },
        {
          params: new SearchParams({
            page: 1,
            per_page: 2,
            sort: 'name',
            sort_dir: 'desc',
          }),
          expected: new SearchResult({
            items: [items[3], items[2]],
            total: 5,
            current_page: 1,
            per_page: 2,
            sort: 'name',
            sort_dir: 'desc',
            filter: null,
          }),
        },
        {
          params: new SearchParams({
            page: 2,
            per_page: 2,
            sort: 'name',
            sort_dir: 'desc',
          }),
          expected: new SearchResult({
            items: [items[4], items[0]],
            total: 5,
            current_page: 2,
            per_page: 2,
            sort: 'name',
            sort_dir: 'desc',
            filter: null,
          }),
        },
      ]

      for (const item of arrange) {
        let result = await repository.search(item.params)
        expect(result).toStrictEqual(item.expected)
      }
    })

    test('should search using filter, paginate and sort', async () => {
      const items = [
        new StubEntity({name: 'test', price: 100}),
        new StubEntity({name: 'a', price: 200}),
        new StubEntity({name: 'TEST', price: 100}),
        new StubEntity({name: 'e', price: 200}),
        new StubEntity({name: 'TeSt', price: 200}),
      ]
      repository.items = items

      const arrange = [
        {
          params: new SearchParams({
            page: 1,
            per_page: 2,
            sort: 'name',
            filter: 'TEST',
          }),
          expected: new SearchResult({
            items: [items[2], items[4]],
            total: 3,
            current_page: 1,
            per_page: 2,
            sort: 'name',
            sort_dir: 'asc',
            filter: 'TEST',
          }),
        },
        {
          params: new SearchParams({
            page: 2,
            per_page: 2,
            sort: 'name',
            filter: 'TEST',
          }),
          expected: new SearchResult({
            items: [items[0]],
            total: 3,
            current_page: 2,
            per_page: 2,
            sort: 'name',
            sort_dir: 'asc',
            filter: 'TEST',
          }),
        },
        {
          params: new SearchParams({
            page: 2,
            per_page: 2,
            sort: 'name',
            sort_dir: 'desc',
            filter: 'TEST',
          }),
          expected: new SearchResult({
            items: [items[2]],
            total: 3,
            current_page: 2,
            per_page: 2,
            sort: 'name',
            sort_dir: 'desc',
            filter: 'TEST',
          }),
        },
      ]

      for (const item of arrange) {
        let result = await repository.search(item.params)
        expect(result).toStrictEqual(item.expected)
      }
    })
  })
})
