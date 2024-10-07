import {Category} from '../../domain/entities/category'
import {CategoryOutputMapper} from './category-output'

describe('CategoryOutputMapper', () => {
  test('should convert a category to an output', () => {
    const created_at = new Date()
    const entity = new Category({
      name: 'Category Name',
      description: 'Category Description',
      is_active: true,
      created_at,
    })
    const spyToJSON = jest.spyOn(entity, 'toJSON')
    const output = CategoryOutputMapper.toOutput(entity)
    expect(output).toStrictEqual({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at,
    })
    expect(spyToJSON).toHaveBeenCalled()
  })
})
