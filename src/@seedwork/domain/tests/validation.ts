import {EntityValidationError} from '../errors/validation-error'
import {ClassValidatorFields} from '../validators/class-validator-fields'
import {FieldsErrors} from '../validators/validator-fields-interface'
import {expect} from 'expect'
type Expected = {validator: ClassValidatorFields<any>; data: any} | (() => any)

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldsErrors) {
    if (typeof expected === 'function') {
      try {
        expected()
        return valid()
      } catch (e) {
        const error = e as EntityValidationError
        return assertContainsErrorMessages(error.error, received)
      }
    } else {
      const {validator, data} = expected
      const isValid = validator.validate(data)
      if (isValid) return valid()
      return assertContainsErrorMessages(validator.errors, received)
    }
  },
})

function valid() {
  return {pass: true, message: () => ''}
}

function invalid(errors: FieldsErrors) {
  return {
    pass: false,
    message: () => `Tha validation errors not contains ${JSON.stringify(errors)}`,
  }
}

function assertContainsErrorMessages(expected: FieldsErrors, received: FieldsErrors) {
  const isMatch = expect.objectContaining(received).asymmetricMatch(expected)
  return isMatch ? valid() : invalid(expected)
}
