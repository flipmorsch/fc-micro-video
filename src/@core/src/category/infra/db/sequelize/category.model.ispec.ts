import {Sequelize} from 'sequelize-typescript'
import {CategoryModel} from './category.model'

describe('CategoryModel Tests', () => {
  let sequelize: Sequelize

  beforeAll(
    () =>
      (sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
        models: [CategoryModel],
      }))
  )

  beforeEach(async () => await sequelize.sync({force: true}))

  afterAll(async () => await sequelize.close())

  test('create', async () => {
    const arrange = {
      id: '9366b7dc-2d71-4799-b91c-c64adb27f13e',
      name: 'Test',
    }
    const categoryModel = await CategoryModel.create(arrange)

    expect(categoryModel.toJSON()).toMatchObject(arrange)
    expect(categoryModel).toHaveProperty('created_at')
    expect(categoryModel).toHaveProperty('is_active')
    expect(categoryModel.created_at).toBeInstanceOf(Date)
    expect(categoryModel.is_active).toBeTruthy()
  })
})
