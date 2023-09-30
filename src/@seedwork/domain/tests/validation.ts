import {ClassValidatorFields} from '../validators/class-validator-fields'
import {FieldsErrors} from '../validators/validator-fields-interface'
import {expect} from 'expect'
type Expected = {validator: ClassValidatorFields<any>; data: any}

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldsErrors) {
    const {validator, data} = expected
    const isValid = validator.validate(data)
    if (isValid) return {pass: false, message: () => 'The data is valid'}
    const isMatch = expect.objectContaining(received).asymmetricMatch(validator.errors)
    return isMatch
      ? {pass: true, message: () => ''}
      : {
          pass: false,
          message: () => `Tha validation errors not contains ${JSON.stringify(validator.errors)}`,
        }
  },
})
