import {
  Column,
  CreatedAt,
  DeletedAt,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  underscored: true,
})
export class TambolaTicket {
  @PrimaryKey
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false, unique: true })
  ticketNumber: number;

  @Column({ allowNull: false })
  ticketData: Array<Array<number>>;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
