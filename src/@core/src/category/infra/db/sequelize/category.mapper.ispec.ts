import {Sequelize} from 'sequelize-typescript'
import {CategoryModel} from './category.model'
import {CategorySequelizeRepository} from './category.repository'
import {CategoryModelMapper} from './category.mapper'
import {LoadEntityError, UniqueEntityId} from '#seedwork/domain'
import {Category} from '#category/domain'

describe('CategoryModelMapper Tests', () => {
  let sequelize: Sequelize
  let repository: CategorySequelizeRepository

  beforeAll(
    () =>
      (sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
        models: [CategoryModel],
      }))
  )

  beforeEach(async () => {
    repository = new CategorySequelizeRepository(CategoryModel)
    await sequelize.sync({force: true})
  })

  afterAll(async () => await sequelize.close())
  it('should throw error when category is invalid', () => {
    const model = CategoryModel.build({
      id: '831a4ff9-177c-4ef5-8b3c-2be43d5bc3df',
    } as any)
    try {
      CategoryModelMapper.toEntity(model)
    } catch (error) {
      expect(error).toBeInstanceOf(LoadEntityError)
      expect(error.error).toMatchObject({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ],
      })
    }
  })

  it('should throw a generic error', () => {
    const genericError = new Error('Generic error')
    const spyValidate = jest
      .spyOn(Category, 'validate')
      .mockImplementationOnce(() => {
        throw genericError
      })
    const model = CategoryModel.build({
      id: '831a4ff9-177c-4ef5-8b3c-2be43d5bc3df',
    } as any)
    expect(() => CategoryModelMapper.toEntity(model)).toThrow(genericError)
    expect(spyValidate).toHaveBeenCalled()
  })

  it('should convert a category model to a category entity', () => {
    const created_at = new Date()
    const model = CategoryModel.build({
      id: '831a4ff9-177c-4ef5-8b3c-2be43d5bc3df',
      name: 'Movie',
      description: 'Some description',
      is_active: true,
      created_at,
    })
    const entity = CategoryModelMapper.toEntity(model)
    expect(entity.toJSON()).toStrictEqual(
      new Category(
        {
          name: 'Movie',
          description: 'Some description',
          is_active: true,
          created_at,
        },
        new UniqueEntityId('831a4ff9-177c-4ef5-8b3c-2be43d5bc3df')
      ).toJSON()
    )
  })
})
