import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Transaction } from "./Transaction";

@Table({
  tableName: "categories",
  timestamps: true,
})

export class Category extends Model {
  
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    icon!: string;

    @HasMany(() => Transaction)
    transactions!: Transaction[];
}

