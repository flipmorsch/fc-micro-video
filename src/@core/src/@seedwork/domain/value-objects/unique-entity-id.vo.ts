import InvalidUuidError from '../errors/invalid-uuid.error'
import {randomUUID} from 'crypto'
import {ValueObject} from './value-object'

export class UniqueEntityId extends ValueObject<string> {
  constructor(readonly id?: string) {
    super(id || randomUUID())
    this.validate()
  }

  private validate() {
    const isValid = RegExp(
      /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i
    ).exec(this.value)
    if (!isValid) throw new InvalidUuidError()
  }
}

export class UniqueEntityName extends ValueObject<string> {
  constructor(readonly id?: string) {
    super(id || randomUUID())
    this.validate()
  }

  private validate() {
    const isValid = RegExp(
      /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i
    ).exec(this.value)
    if (!isValid) throw new InvalidUuidError()
  }
}
