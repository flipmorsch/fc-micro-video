export default abstract class ValueObject<T = any> {
  protected _value: T

  constructor(value: T) {
    this._value = value
  }

  get value(): T {
    return this._value
  }
}
