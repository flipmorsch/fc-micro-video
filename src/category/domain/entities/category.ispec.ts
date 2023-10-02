import {Category} from './category'

describe('Category Integration Tests', () => {
  it('should be a invalid category using name property', () => {
    expect(() => new Category({name: null})).containsErrorMessages({
      name: [
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ],
    })
    expect(() => new Category({name: ''})).containsErrorMessages({
      name: ['name should not be empty'],
    })
    expect(() => new Category({name: 'a'.repeat(256)})).containsErrorMessages({
      name: ['name must be shorter than or equal to 255 characters'],
    })
    expect(() => new Category({name: 5 as any})).containsErrorMessages({
      name: ['name must be a string', 'name must be shorter than or equal to 255 characters'],
    })
  })

  it('should be a invalid category using description property', () => {
    expect(() => new Category({name: 'any', description: 5 as any})).containsErrorMessages({
      description: ['description must be a string'],
    })
    expect(() => new Category({name: 'any', description: null})).not.toThrow()
  })

  it('should be a invalid category using is_active property', () => {
    expect(() => new Category({name: 'any', is_active: 'any' as any})).containsErrorMessages({
      is_active: ['is_active must be a boolean value'],
    })
    expect(() => new Category({name: 'any', is_active: null})).not.toThrow()
  })

  describe('update method', () => {
    let category = new Category({name: 'Movie'})
    expect(() => category.update(null, null)).containsErrorMessages({
      name: [
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ],
    })

    category = new Category({name: 'Movie'})
    expect(() => category.update('Movie', null)).not.toThrow()

    category = new Category({name: 'Movie'})
    expect(() => category.update(5 as any, 'Movie description')).containsErrorMessages({
      name: ['name must be a string', 'name must be shorter than or equal to 255 characters'],
    })

    category = new Category({name: 'Movie'})
    expect(() => category.update('t'.repeat(256), null)).containsErrorMessages({
      name: ['name must be shorter than or equal to 255 characters'],
    })
  })
})
