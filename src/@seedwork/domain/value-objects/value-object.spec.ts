import ValueObject from './value-object'

class StubValueObject extends ValueObject {
}

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

  it('should convert to a string', () => {
    const date = new Date()
    let arrange = [
      {received: null, expected: "null"},
      {received: undefined, expected: "undefined"},
      {received: 0, expected: "0"},
      {received: 1, expected: "1"},
      {received: 5, expected: "5"},
      {received: "", expected: ""},
      {received: "value", expected: "value"},
      {received: true, expected: "true"},
      {received: false, expected: "false"},
      {received: date, expected: date.toString()},
      {received: {prop1: 'value1'}, expected: JSON.stringify({prop1: 'value1'})},

    ]
    arrange.forEach(value => {
      let valueObject = new StubValueObject(value.received)
      expect(valueObject.toString()).toEqual(value.expected)
    })
  })
})