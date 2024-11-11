import { Table, Model, DataType, Column } from 'sequelize-typescript';

@Table
export class Theater extends Model<Theater> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  location: string;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  seatConfiguration: object;
}

export default Theater;
