import {deepFreeze} from "../utils/object.utils";

export default abstract class ValueObject<T = any> {
  protected _value: T

  constructor(value: T) {
    this._value = deepFreeze(value)
  }

  get value(): T {
    return this._value
  }

  toString = () => {
    if (typeof this.value !== 'object' || this.value === null) {
      return this.value?.toString() || this.value + ""
    }
    const valueStr = this.value.toString()
    return valueStr === "[object Object]" ? JSON.stringify(this.value) : valueStr
  }
}
