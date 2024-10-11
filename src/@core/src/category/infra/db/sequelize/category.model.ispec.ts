import {DataType, Sequelize} from 'sequelize-typescript'
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

  test('mapping props', () => {
    const attributesMap = CategoryModel.getAttributes()
    expect(Object.keys(attributesMap)).toStrictEqual([
      'id',
      'name',
      'description',
      'is_active',
      'created_at',
    ])

    expect(attributesMap.id).toMatchObject({
      field: 'id',
      primaryKey: true,
      type: DataType.UUID(),
    })

    expect(attributesMap.name).toMatchObject({
      field: 'name',
      allowNull: false,
      type: DataType.STRING(255),
    })

    expect(attributesMap.description).toMatchObject({
      field: 'description',
      type: DataType.TEXT(),
    })

    expect(attributesMap.is_active).toMatchObject({
      field: 'is_active',
      allowNull: false,
      type: DataType.BOOLEAN(),
    })

    expect(attributesMap.created_at).toMatchObject({
      field: 'created_at',
      type: DataType.DATE(),
      allowNull: false,
    })
  })

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
