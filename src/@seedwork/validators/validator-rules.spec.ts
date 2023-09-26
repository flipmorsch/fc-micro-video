import {ValidationError} from '../../@seedwork/errors/validation-error'
import {ValidatorRules} from './validator-rules'

describe('ValidatorRules Unit Tests', () => {
  test('values method', () => {
    const validator = ValidatorRules.values('value', 'property')
    expect(validator).toBeInstanceOf(ValidatorRules)
    expect(validator['property']).toBe('property')
    expect(validator['value']).toBe('value')
  })

  test('required validation rule', () => {
    const invalidCases = [null, undefined, '']
    invalidCases.forEach(invalidCase => {
      expect(() => ValidatorRules.values(invalidCase, 'field').required()).toThrow(
        new ValidationError(`The field is required`)
      )
    })

    const validCases = ['value', 0, false]
    validCases.forEach(validCase => {
      expect(() => ValidatorRules.values(validCase, 'field').required()).not.toThrow()
    })
  })

  test('string validation rule', () => {
    const invalidCases = [0, false, {}, []]
    invalidCases.forEach(invalidCase => {
      expect(() => ValidatorRules.values(invalidCase, 'field').string()).toThrow(
        new ValidationError(`The field must be a string`)
      )
    })

    expect(() => ValidatorRules.values('value', 'field').string()).not.toThrow()
  })

  test('maxLength validation rule', () => {
    const invalidCases = ['value', 'value1', 'value12']
    invalidCases.forEach(invalidCase => {
      expect(() =>
        ValidatorRules.values(invalidCase, 'field').maxLength(invalidCase.length - 1)
      ).toThrow(
        new ValidationError(
          `The field must be less or equal than ${invalidCase.length - 1} characters`
        )
      )
    })

    const validCases = ['value', 'value1', 'value12', 'value12345']
    validCases.forEach(validCase => {
      expect(() =>
        ValidatorRules.values(validCase, 'field').maxLength(validCase.length)
      ).not.toThrow()
    })
  })

  test('boolean validation rule', () => {
    const invalidCases = [5, 'true', 'false']
    invalidCases.forEach(invalidCase => {
      expect(() => ValidatorRules.values(invalidCase, 'field').boolean()).toThrow(
        new ValidationError(`The field must be a boolean`)
      )
    })

    const validCases = [true, false]
    validCases.forEach(validCase => {
      expect(() => ValidatorRules.values(validCase, 'field').boolean()).not.toThrow()
    })
  })
})
