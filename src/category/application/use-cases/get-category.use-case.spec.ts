import GetCategoryUseCase from './get-category.use-case'
import {CategoryInMemoryRepository} from '../../infra/repository/category-in-memory.repository'
import {NotFoundError} from '../../../@seedwork/domain/errors/not-found.error'
import {Category} from '../../domain/entities/category'

describe('GetCategoryUseCase', () => {
  let useCase: GetCategoryUseCase
  let repository: CategoryInMemoryRepository

  beforeEach(() => {
    repository = new CategoryInMemoryRepository()
    useCase = new GetCategoryUseCase(repository)
  })

  it('should throw error when category not found', async () => {
    await expect(useCase.execute({id: 'NOT-FOUND-ID'})).rejects.toThrow(
      new NotFoundError('Entity not found using ID NOT-FOUND-ID')
    )
  })

  it('should return a category', async () => {
    const spyFindById = jest.spyOn(repository, 'findById')

    const items = [
      new Category({
        name: 'Teste',
        description: 'Teste description',
        is_active: true,
        created_at: new Date(),
      }),
    ]
    repository.items = items
    let output = await useCase.execute({
      id: items[0].id,
    })
    expect(output).toStrictEqual({
      id: items[0].id,
      name: items[0].name,
      description: items[0].description,
      is_active: items[0].is_active,
      created_at: items[0].created_at,
    })
    expect(spyFindById).toHaveBeenCalledTimes(1)
  })
})
