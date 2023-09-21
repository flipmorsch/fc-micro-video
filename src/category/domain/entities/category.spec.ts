import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.vo'
import {Category} from './category'

describe('Category', () => {
  test('constructor of category', () => {
    const created_at = new Date()
    const props = {
      name: 'Movie',
      created_at,
      is_active: false,
      description: 'Movies',
    }

    const category = new Category(props)

    expect(category.name).toBe('Movie')
    expect(category.description).toBe('Movies')
    expect(category.is_active).toBeFalsy()
    expect(category.created_at).toBeInstanceOf(Date)
    expect(category.created_at).toEqual(props.created_at)
    expect(category.props).toStrictEqual(props)
    expect(category.id).toBeDefined()
  })

  test('should set is_active to true if this property is not defined', () => {
    const props = {
      name: 'Movie',
    }

    const category = new Category(props)

    expect(category.is_active).toBeTruthy()
    expect(category.props).toStrictEqual({...props, is_active: true})
  })

  test('should set description to null if this property is not defined', () => {
    const props = {
      name: 'Movie',
    }

    const category = new Category(props)

    expect(category.description).toBeNull()
    expect(category.props).toStrictEqual({...props, description: null})
  })

  test('should set created_at to current date if this property is not defined', () => {
    const props = {
      name: 'Movie',
    }

    const category = new Category(props)
    const currentDate = new Date()

    expect(category.created_at).toBeInstanceOf(Date)
    expect(category.created_at).toEqual(currentDate)
    expect(category.props).toStrictEqual({...props})
  })

  it('should activate a category', () => {
    const props = {
      name: 'Movie',
      is_active: false,
    }
    const category = new Category(props)
    category.activate()
    expect(category.is_active).toBeTruthy()
  })

  it('should deactivate a category', () => {
    const props = {
      name: 'Movie',
    }
    const category = new Category(props)
    category.deactivate()
    expect(category.is_active).toBeFalsy()
  })

  it('should update a category', () => {
    const props = {
      name: 'Horror Movies',
      description: 'Movies in horror genre',
    }
    const category = new Category(props)
    category.update('Drama Movies', 'Movies in drama genre')
    expect(category.name).toBe('Drama Movies')
    expect(category.description).toBe('Movies in drama genre')
  })
})
