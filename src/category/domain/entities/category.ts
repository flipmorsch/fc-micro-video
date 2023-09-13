export type CategoryProperties = {
  name: string
  description?: string
  is_active?: boolean
  created_at?: Date
}

export class Category {
  constructor(public readonly props: CategoryProperties) {
    this.description = props.description
    this.created_at = props.created_at
    this.is_active = props.is_active
  }

  get name(): string {
    return this.props.name
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
