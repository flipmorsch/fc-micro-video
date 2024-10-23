import {FieldsErrors} from '#seedwork/domain'

export class LoadEntityError extends Error {
  constructor(
    public error: FieldsErrors,
    message?: string
  ) {
    super(message ?? "An entity can't be loaded")
    this.name = 'LoadEntityError'
  }
}
