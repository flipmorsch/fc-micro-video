import CategoryValidatorFactory, {CategoryRules, CategoryValidator} from './category.validator'

describe('CategoryValidator Unit Tests', () => {
  let validator: CategoryValidator
  beforeEach(() => {
    validator = CategoryValidatorFactory.create()
  })
  test('invalidation cases for name field', () => {
    let isValid = validator.validate(null)
    expect(isValid).toBeFalsy()
    expect(validator.errors['name']).toStrictEqual([
      'name should not be empty',
      'name must be a string',
      'name must be shorter than or equal to 255 characters',
    ])

    isValid = validator.validate({name: ''})
    expect(isValid).toBeFalsy()
    expect(validator.errors['name']).toStrictEqual(['name should not be empty'])

    isValid = validator.validate({name: 'a'.repeat(256)})
    expect(isValid).toBeFalsy()
    expect(validator.errors['name']).toStrictEqual([
      'name must be shorter than or equal to 255 characters',
    ])

    isValid = validator.validate({name: 5 as any})
    expect(isValid).toBeFalsy()
    expect(validator.errors['name']).toStrictEqual([
      'name must be a string',
      'name must be shorter than or equal to 255 characters',
    ])
  })

  test('valid cases for fields', () => {
    let isValid = validator.validate({name: 'any'})
    expect(isValid).toBeTruthy()
    expect(validator.errors).toBeNull()
    expect(validator.validateData).toStrictEqual(new CategoryRules({name: 'any'}))
    
    isValid = validator.validate({name: 'any', description: 'any'})
    expect(isValid).toBeTruthy()
    expect(validator.errors).toBeNull()
    expect(validator.validateData).toStrictEqual(new CategoryRules({name: 'any', description: 'any'}))
    
    isValid = validator.validate({name: 'any', description: null})
    expect(isValid).toBeTruthy()
    expect(validator.errors).toBeNull()
    expect(validator.validateData).toStrictEqual(new CategoryRules({name: 'any', description: null}))

    isValid = validator.validate({name: 'any', description: undefined})
    expect(isValid).toBeTruthy()
    expect(validator.errors).toBeNull()
    expect(validator.validateData).toStrictEqual(new CategoryRules({name: 'any', description: undefined}))

    isValid = validator.validate({name: 'any', is_active: true})
    expect(isValid).toBeTruthy()
    expect(validator.errors).toBeNull()
    expect(validator.validateData).toStrictEqual(new CategoryRules({name: 'any', is_active: true}))
    
    isValid = validator.validate({name: 'any', is_active: false})
    expect(isValid).toBeTruthy()
    expect(validator.errors).toBeNull()
    expect(validator.validateData).toStrictEqual(new CategoryRules({name: 'any', is_active: false}))
  })
})
