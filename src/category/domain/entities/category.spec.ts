import {Category} from './category'

describe('Category', () => {
  test('constructor of category', () => {
    const category = new Category({name: 'Movie'})
    expect(category.name).toBe('Movie')
    expect(category.description).toBeUndefined()
    expect(category.is_active).toBeUndefined()
  })
})
