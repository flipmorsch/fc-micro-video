import {Category} from './category'

describe('Category Integration Tests', () => {
  it('should be a invalid category using name property', () => {
    expect(() => new Category({name: null})).toThrow('The name is required')
    expect(() => new Category({name: ''})).toThrow('The name is required')
    expect(() => new Category({name: 'a'.repeat(256)})).toThrow(
      'The name must be less or equal than 255 characters'
    )
    expect(() => new Category({name: 5 as any})).toThrow('The name must be a string')
  })

  it('should be a invalid category using description property', () => {
    expect(() => new Category({name: 'any', description: 5 as any})).toThrow(
      'The description must be a string'
    )
    expect(() => new Category({name: 'any', description: 'a'.repeat(256)})).toThrow(
      'The description must be less or equal than 255 characters'
    )
    expect(() => new Category({name: 'any', description: null})).not.toThrow()
  })

  it('should be a invalid category using is_active property', () => {
    expect(() => new Category({name: 'any', is_active: 'any' as any})).toThrow(
      'The is_active must be a boolean'
    )
    expect(() => new Category({name: 'any', is_active: null})).not.toThrow()
  })

  describe('update method', () => {
    let category = new Category({name: 'Movie'})
    expect(() => category.update(null, null)).toThrow('The name is required')

    category = new Category({name: 'Movie'})
    expect(() => category.update('Movie', null)).not.toThrow()

    category = new Category({name: 'Movie'})
    expect(() => category.update(5 as any, 'Movie description')).toThrow(
      'The name must be a string'
    )

    category = new Category({name: 'Movie'})
    expect(() => category.update('t'.repeat(256), null)).toThrow(
      'The name must be less or equal than 255 characters'
    )

    category = new Category({name: 'Movie'})
    expect(() => category.update('Movie', 't'.repeat(256))).toThrow(
      'The description must be less or equal than 255 characters'
    )
  })
})
