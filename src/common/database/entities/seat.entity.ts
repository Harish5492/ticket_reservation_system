import {
  Table,
  Model,
  DataType,
  Column,
  BelongsToMany,
} from 'sequelize-typescript';
import ShowTime from './showTime.entity';
import ShowTimeSeat from './showTime.seats.entity';

@Table
export class Seat extends Model<Seat> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  row: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  seatNumber: number;

  @Column({
    type: DataType.ENUM('gold', 'diamond', 'normal'),
    allowNull: false,
  })
  type: 'gold' | 'diamond' | 'normal';

  @BelongsToMany(() => ShowTime, () => ShowTimeSeat)
  showTimes: ShowTime[];
}

export default Seat;
