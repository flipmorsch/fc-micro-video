import {deepFreeze} from "./object.utils";

describe('Object', () => {
  it('should not freeze a primitive value', () => {
    const string = deepFreeze('any value')
    expect(string).toEqual('any value')
    expect(typeof string).toBe('string')

    const boolean = deepFreeze(true)
    expect(boolean).toEqual(true)
    expect(typeof boolean).toBe('boolean')

    const number = deepFreeze(1)
    expect(number).toEqual(1)
    expect(typeof number).toBe('number')
  })

  it('should be a immutable object', () => {
    const obj = deepFreeze({prop1: 'value1', deep: {prop2: 'value2', prop3: new Date()}})


    expect(Object.isFrozen(obj.prop1)).toBe(true)
    expect(Object.isFrozen(obj.deep)).toBe(true)
    expect(() => {
      obj.prop1 = 'value2'
    }).toThrowError(TypeError)
    expect(() => {
      obj.deep.prop2 = 'value3'
    }).toThrowError(TypeError)
    expect(() => {
        obj.deep.prop3 = new Date()
    }).toThrowError(TypeError)
    expect(obj.deep.prop3).toBeInstanceOf(Date)
  })
})