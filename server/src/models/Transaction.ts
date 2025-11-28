import { Table, Column, Model, DataType } from "sequelize-typescript";

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

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  count!: number;
}

