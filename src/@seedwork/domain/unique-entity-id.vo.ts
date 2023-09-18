import InvalidUuidError from '../errors/invalid-uuid.error'
import {randomUUID} from 'crypto'

export default class UniqueEntityId {
  constructor(public readonly id?: string) {
    this.id = id || randomUUID()
    this.validate()
  }

  private validate() {
    const isValid = RegExp(
      /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i
    ).exec(this.id)
    if (!isValid) throw new InvalidUuidError()
  }
}
