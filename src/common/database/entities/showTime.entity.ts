import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import Movies from './movies.entity';
import Auditorium from './auditorium.entity';
import ShowTimeSeat from './showTime.seats.entity';

@Table
export class ShowTime extends Model<ShowTime> {
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

  @BelongsTo(() => Auditorium, { as: 'Auditorium' })
  auditorium: Auditorium;

  @ForeignKey(() => Movies)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  movieId: string;

  @BelongsTo(() => Movies, { as: 'Movie' })
  movie: Movies;

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  startTime: string;

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  endTime: string;

  @HasMany(() => ShowTimeSeat)
  showTimeSeats: ShowTimeSeat[];
}

export default ShowTime;
