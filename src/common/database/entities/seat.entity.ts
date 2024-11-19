import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Auditorium } from './auditorium.entity';

@Table
export class Seat extends Model<Seat> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Auditorium)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  auditoriumId: string;

  @BelongsTo(() => Auditorium)
  auditorium: Auditorium;

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

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  })
  isActive: boolean;
}

export default Seat;
