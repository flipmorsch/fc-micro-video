import {Category} from './category'

describe('Category', () => {
  test('constructor of category', () => {
    const created_at = new Date()
    const props = {
      name: 'Movie',
      created_at,
      is_active: true,
      description: 'Movies',
    }

    const category = new Category(props)

    expect(category.name).toBe('Movie')
    expect(category.description).toBe('Movies')
    expect(category.is_active).toBeTruthy()
    expect(category.created_at).toBeInstanceOf(Date)
    expect(category.created_at).toEqual(props.created_at)
    expect(category.props).toStrictEqual(props)
  })
})
