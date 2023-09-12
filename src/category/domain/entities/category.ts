export type CategoryProperties = {
  name: string
  description?: string
  is_active?: boolean
  created_at?: Date
}

export class Category {
  constructor(public readonly props: Readonly<CategoryProperties>) {}

  // generate getters
  get name(): string {
    return this.props.name
  }

  get description(): string | undefined {
    return this.props.description
  }

  get is_active(): boolean | undefined {
    return this.props.is_active
  }
}
