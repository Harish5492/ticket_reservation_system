import {
  Table,
  Model,
  Column,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import Seat from './seat.entity';
import ShowTime from './showTime.entity';

@Table
export class ShowTimeSeat extends Model<ShowTimeSeat> {
  @ForeignKey(() => ShowTime)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  showTimeId: string;

  @ForeignKey(() => Seat)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  seatId: string;

  @Column({
    type: DataType.ENUM('available', 'reserved', 'blocked'),
    allowNull: false,
    defaultValue: 'available',
  })
  status: 'available' | 'reserved' | 'blocked';

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  reservedBy?: string; // User ID of the person who reserved the seat
}

export default ShowTimeSeat;
