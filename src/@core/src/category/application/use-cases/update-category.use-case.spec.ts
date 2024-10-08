import {UpdateCategoryUseCase} from './update-category.use-case'
import {CategoryInMemoryRepository} from '../../infra/repository/category-in-memory.repository'
import {NotFoundError} from '../../../@seedwork/domain/errors/not-found.error'
import {Category} from '../../domain/entities/category'

describe('UpdateCategoryUseCase', () => {
  let useCase: UpdateCategoryUseCase.UseCase
  let repository: CategoryInMemoryRepository

  beforeEach(() => {
    repository = new CategoryInMemoryRepository()
    useCase = new UpdateCategoryUseCase.UseCase(repository)
  })

  it('should throw error when category not found', async () => {
    await expect(
      useCase.execute({id: 'NOT-FOUND-ID', name: 'fake'})
    ).rejects.toThrow(
      new NotFoundError('Entity not found using ID NOT-FOUND-ID')
    )
  })

  it('should update a category', async () => {
    const spyUpdate = jest.spyOn(repository, 'update')

    const entity = new Category({
      name: 'Movie',
      description: 'some description',
      is_active: true,
    })
    const spyDeactivate = jest.spyOn(entity, 'deactivate')
    const spyActivate = jest.spyOn(entity, 'activate')
    repository.items = [entity]
    let output = await useCase.execute({
      id: entity.id,
      name: 'Another movie',
      description: 'another description',
      is_active: true,
    })
    expect(output).toStrictEqual({
      id: entity.id,
      name: 'Another movie',
      description: 'another description',
      is_active: true,
      created_at: entity.created_at,
    })
    expect(spyUpdate).toHaveBeenCalledTimes(1)
    expect(spyActivate).toHaveBeenCalledTimes(1)

    output = await useCase.execute({
      id: entity.id,
      name: 'test',
      is_active: false,
    })
    expect(output).toStrictEqual({
      id: entity.id,
      name: 'test',
      description: null,
      is_active: false,
      created_at: entity.created_at,
    })
    expect(spyUpdate).toHaveBeenCalledTimes(2)
    expect(spyDeactivate).toHaveBeenCalledTimes(1)
  })
})
