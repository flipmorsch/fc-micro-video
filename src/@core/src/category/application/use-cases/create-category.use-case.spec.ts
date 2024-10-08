import {CreateCategoryUseCase} from './create-category.use-case'
import {CategoryInMemoryRepository} from '../../infra/db/in-memory/category-in-memory.repository'

describe('CreateCategoryUseCase', () => {
  let useCase: CreateCategoryUseCase.UseCase
  let repository: CategoryInMemoryRepository

  beforeEach(() => {
    repository = new CategoryInMemoryRepository()
    useCase = new CreateCategoryUseCase.UseCase(repository)
  })

  it('should create a category', async () => {
    const spyInsert = jest.spyOn(repository, 'insert')
    let output = await useCase.execute({
      name: 'Teste',
    })
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: 'Teste',
      description: null,
      is_active: true,
      created_at: repository.items[0].created_at,
    })
    expect(spyInsert).toHaveBeenCalledTimes(1)

    output = await useCase.execute({
      name: 'Teste',
      description: 'Teste description',
      is_active: false,
    })
    expect(output).toStrictEqual({
      id: repository.items[1].id,
      name: 'Teste',
      description: 'Teste description',
      is_active: false,
      created_at: repository.items[1].created_at,
    })
    expect(spyInsert).toHaveBeenCalledTimes(2)
  })
})
