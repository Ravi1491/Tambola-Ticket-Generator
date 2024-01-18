import {
  Column,
  Model,
  CreatedAt,
  DeletedAt,
  PrimaryKey,
  Table,
  UpdatedAt,
  DataType,
} from 'sequelize-typescript';

@Table({
  underscored: true,
})
export class TambolaTicket extends Model {
  @PrimaryKey
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false })
  ticketNumber: number;

  @Column({ allowNull: false })
  setNumber: number;

  @Column({ defaultValue: {}, type: DataType.JSONB, allowNull: false })
  ticketData: object;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
