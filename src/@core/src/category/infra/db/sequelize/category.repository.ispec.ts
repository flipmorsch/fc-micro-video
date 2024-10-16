import {Sequelize} from 'sequelize-typescript'
import {CategoryModel} from './category.model'
import {Category} from '../../../domain'
import {CategorySequelizeRepository} from './category.repository'

describe('CategorySequelizeRepository tests', () => {
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

  it('should insert a new category entity', async () => {
    let category = new Category({name: 'Movie'})
    await repository.insert(category as any)
    let model = await CategoryModel.findOne({where: {id: category.id}})
    expect(model?.toJSON()).toStrictEqual(category.toJSON())
    expect(model?.dataValues.is_active).toBeTruthy()
    expect(model?.dataValues.created_at).toBeInstanceOf(Date)

    category = new Category({name: 'Movie', description: 'some description', is_active: false})
    await repository.insert(category as any)
    model = await CategoryModel.findOne({where: {id: category.id}})
    expect(model?.toJSON()).toStrictEqual(category.toJSON())
    expect(model?.dataValues.is_active).toBeFalsy()
  })
})
