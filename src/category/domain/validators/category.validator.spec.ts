import CategoryValidatorFactory, {CategoryRules, CategoryValidator} from './category.validator'

describe('CategoryValidator Unit Tests', () => {
  let validator: CategoryValidator
  beforeEach(() => {
    validator = CategoryValidatorFactory.create()
  })
  test('invalidation cases for name field', () => {
    expect({validator, data: null}).containsErrorMessages({
      name: [
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ],
    })
    expect({validator, data: {name: ''}}).containsErrorMessages({
      name: ['name should not be empty'],
    })
    expect({validator, data: {name: 'a'.repeat(256)}}).containsErrorMessages({
      name: ['name must be shorter than or equal to 255 characters'],
    })
    expect({validator, data: {name: 5 as any}}).containsErrorMessages({
      name: ['name must be a string', 'name must be shorter than or equal to 255 characters'],
    })
  })

  test('invalidation cases for description field', () => {
    expect({validator, data: {description: 5 as any}}).containsErrorMessages({
      description: ['description must be a string'],
    })
  })

  test('invalidation cases for is_active field', () => {
    expect({validator, data: {is_active: 5 as any}}).containsErrorMessages({
      is_active: ['is_active must be a boolean value'],
    })
  })

  test('valid cases for fields', () => {
    const arrange = [
      {name: 'any'},
      {name: 'any', description: 'any'},
      {name: 'any', description: null},
      {name: 'any', description: undefined},
      {name: 'any', is_active: true},
      {name: 'any', is_active: false},
    ]

    arrange.forEach(data => {
      const isValid = validator.validate(data)
      expect(isValid).toBeTruthy()
      expect(validator.errors).toBeNull()
      expect(validator.validatedData).toStrictEqual(new CategoryRules(data))
    })
  })
})
