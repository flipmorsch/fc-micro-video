import ValueObject from './value-object'

class StubValueObject extends ValueObject<string> {}

describe('ValueObject', () => {
  it('should be defined', () => {
    expect(new StubValueObject('')).toBeDefined()
  })

  it('should set value', () => {
    let value: any = 'value'
    let valueObject = new StubValueObject(value)
    expect(valueObject.value).toEqual(value)

    value = {prop1: 'value1'}
    valueObject = new StubValueObject(value)
    expect(valueObject.value).toStrictEqual(value)
  })
})