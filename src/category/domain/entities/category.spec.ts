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

    const category = new Category(props, '1234')

    expect(category.name).toBe('Movie')
    expect(category.description).toBe('Movies')
    expect(category.is_active).toBeFalsy()
    expect(category.created_at).toBeInstanceOf(Date)
    expect(category.created_at).toEqual(props.created_at)
    expect(category.props).toStrictEqual(props)
    expect(category.id).toBe('1234')
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
    console.log(props)

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

  test('should set id to randomUUID if this property is not defined', () => {
    const data = [
      {props: {name: 'Movie'}, id: undefined},
      {props: {name: 'Movie'}, id: null},
      {props: {name: 'Movie'}, id: ''},
      {props: {name: 'Movie'}},
    ]

    data.forEach(({props, id}) => {
      const category = new Category(props, id)
      expect(category.id).not.toBeUndefined()
      expect(
        RegExp(/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i).exec(
          category.id
        )
      ).toBeTruthy()
    })
  })
})
