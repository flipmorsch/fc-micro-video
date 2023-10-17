import {ClassValidatorFields} from './class-validator-fields'
import * as libClassValidator from 'class-validator'

class StubClassValidatorFields extends ClassValidatorFields<{name: string}> {}

describe('ClassValidatorFields Unit Tests', () => {
  it('should initialize errors and validateData with null', () => {
    const validator = new StubClassValidatorFields()
    expect(validator.errors).toBeNull()
    expect(validator.validatedData).toBeNull()
  })

  it('should validate with errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
    spyValidateSync.mockReturnValue([
      {
        property: 'name',
        constraints: {
          isRequired: 'some error',
        },
      },
    ])
    const validator = new StubClassValidatorFields()
    expect(validator.validate(null)).toBeFalsy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(validator.validatedData).toBeNull()
    expect(validator.errors).toStrictEqual({name: ['some error']})
  })

  it('should validate without errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
    spyValidateSync.mockReturnValue([])
    const validator = new StubClassValidatorFields()
    expect(validator.validate({name: 'value'})).toBeTruthy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(validator.validatedData).toStrictEqual({name: 'value'})
    expect(validator.errors).toBeNull()
  })
})
