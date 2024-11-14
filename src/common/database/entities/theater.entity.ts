import { Table, Model, DataType, Column, HasMany } from 'sequelize-typescript';
import ShowTime from './showTime.entity';

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

  @HasMany(() => ShowTime)
  showTimes: ShowTime[];
}

export default Theater;
