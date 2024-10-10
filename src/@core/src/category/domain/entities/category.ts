import {Entity} from '../../../@seedwork/domain/entity/entity'
import {UniqueEntityId} from '../../../@seedwork/domain/value-objects/unique-entity-id.vo'
import CategoryValidatorFactory from '../validators/category.validator'
import {EntityValidationError} from '../../../@seedwork/domain/errors/validation-error'

export type CategoryProperties = {
  name: string
  description?: string
  is_active?: boolean
  created_at?: Date
}

export class Category extends Entity<CategoryProperties> {
  constructor(
    public readonly props: CategoryProperties,
    id?: UniqueEntityId
  ) {
    super(props, id)
    Category.validate(props)
    this.description = props.description
    this.created_at = props.created_at
    this.is_active = props.is_active
  }

  update(name: string, description: string): void {
    Category.validate({name, description})
    this.name = name
    this.description = description
  }

  static validate(props: CategoryProperties): void {
    const validator = CategoryValidatorFactory.create()
    const isValid = validator.validate(props)
    if (!isValid) {
      throw new EntityValidationError(validator.errors)
    }
  }

  activate(): void {
    this.is_active = true
  }

  deactivate(): void {
    this.is_active = false
  }

  get name(): string {
    return this.props.name
  }

  private set name(value: string) {
    this.props.name = value
  }

  get description(): string | null {
    return this.props.description
  }

  private set description(value: string) {
    this.props.description = value ?? null
  }

  get is_active(): boolean {
    return this.props.is_active
  }

  private set is_active(value: boolean) {
    this.props.is_active = value ?? true
  }

  get created_at(): Date {
    return this.props.created_at
  }

  private set created_at(value: Date) {
    this.props.created_at = value ?? new Date()
  }
}
