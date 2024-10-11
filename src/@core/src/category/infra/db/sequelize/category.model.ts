import {Model, Column, DataType, PrimaryKey, Table} from 'sequelize-typescript'

type CategoryModelProperties = {
  id: string
  name: string
  description?: string
  is_active?: boolean
  created_at?: Date
}

@Table({tableName: 'categories', timestamps: false})
export class CategoryModel extends Model<CategoryModelProperties> {
  @PrimaryKey
  @Column({type: DataType.UUID})
  declare id: string

  @Column({type: DataType.STRING(255), allowNull: false})
  declare name: string

  @Column({type: DataType.TEXT})
  declare description?: string

  @Column({type: DataType.BOOLEAN, defaultValue: true})
  declare is_active?: boolean

  @Column({type: DataType.DATE, defaultValue: new Date()})
  declare created_at?: Date
}
