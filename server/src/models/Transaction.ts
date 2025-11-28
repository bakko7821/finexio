import { Table, Column, Model, DataType, BelongsTo } from "sequelize-typescript";
import { Category } from "./Category";

@Table({
  tableName: "transactions",
  timestamps: true,
})

export class Transaction extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  ownerId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  icon!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @BelongsTo(() => Category)
  category!: Category;

  @Column
  categoryId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  count!: number;
}

