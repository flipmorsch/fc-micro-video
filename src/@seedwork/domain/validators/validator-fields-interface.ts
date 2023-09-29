export type FieldsErrors = {
  [field: string]: string[]
}

export default interface ValidatorFieldsInterface<ValidatedProps> {
  errors: FieldsErrors
  validateData: ValidatedProps
  validate(data: any): boolean
}
