import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import Theater from './theater.entity';
import Seat from './seat.entity';
import ShowTime from './showTime.entity';

@Table
export class Auditorium extends Model<Auditorium> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Theater)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  theaterId: string;

  @BelongsTo(() => Theater)
  theater: Theater;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => Seat)
  seats: Seat[];

  @HasMany(() => ShowTime)
  showTimes: ShowTime[];
}

export default Auditorium;
