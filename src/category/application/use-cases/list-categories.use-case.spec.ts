import {CategoryInMemoryRepository} from '../../infra/repository/category-in-memory.repository'
import {Category} from '../../domain/entities/category'
import ListCategoriesUseCase from './list-categories.use-case'
import CategoryRepository from '../../domain/repository/category.repository'

describe('ListCategoriesUseCase', () => {
  let useCase: ListCategoriesUseCase
  let repository: CategoryInMemoryRepository

  beforeEach(() => {
    repository = new CategoryInMemoryRepository()
    useCase = new ListCategoriesUseCase(repository)
  })

  test('toOutput method', () => {
    let searchResult = new CategoryRepository.SearchResult({
      items: [new Category({name: 'Movie'})],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_dir: null,
      filter: null,
    })
    let output = useCase['toOutput'](searchResult)
    expect(output).toStrictEqual({
      items: [
        {
          id: searchResult.items[0].id,
          name: searchResult.items[0].name,
          description: searchResult.items[0].description,
          is_active: searchResult.items[0].is_active,
          created_at: searchResult.items[0].created_at,
        },
      ],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    })

    searchResult = new CategoryRepository.SearchResult({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_dir: null,
      filter: null,
    })
    output = useCase['toOutput'](searchResult)
    expect(output).toStrictEqual({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    })
  })

  test('should return output using empty input with categories ordered by created_at', async () => {
    const items = [
      new Category({name: 'test1'}),
      new Category({
        name: 'test2',
        created_at: new Date(new Date().getTime() + 100),
      }),
    ]
    repository.items = items
    const output = await useCase.execute({})
    expect(output).toStrictEqual({
      items: [...items].reverse().map(item => item.toJSON()),
      current_page: 1,
      last_page: 1,
      per_page: 15,
      total: 2,
    })
  })

  test('should return output using pagination, sort and filter', async () => {
    const items = [
      new Category({
        name: 'a',
      }),
      new Category({
        name: 'AAA',
      }),
      new Category({
        name: 'AaA',
      }),
      new Category({
        name: 'b',
      }),
      new Category({
        name: 'c',
      }),
    ]
    repository.items = items
    let output = await useCase.execute({page: 1, per_page: 2, sort: 'name', filter: 'a'})
    expect(output).toStrictEqual({
      items: [items[1].toJSON(), items[2].toJSON()],
      current_page: 1,
      last_page: 2,
      per_page: 2,
      total: 3,
    })

    output = await useCase.execute({page: 2, per_page: 2, sort: 'name', filter: 'a'})
    expect(output).toStrictEqual({
      items: [items[0].toJSON()],
       current_page: 2,
       last_page: 2,
       per_page: 2,
       total: 3,
    })

    output = await useCase.execute({page: 1, per_page: 3, sort: 'name', sort_dir: 'desc', filter: 'a'})
    expect(output).toStrictEqual({
      items: [items[0].toJSON(), items[2].toJSON(), items[1].toJSON()],
       current_page: 1,
       last_page: 1,
       per_page: 3,
       total: 3,
    })
  })
})
