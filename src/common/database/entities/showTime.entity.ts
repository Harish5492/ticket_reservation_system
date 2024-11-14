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
import Theater from './theater.entity';
import ShowTimeSeat from './showTime.seats.entity';

@Table
export class ShowTime extends Model<ShowTime> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Theater)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  theaterId: string;

  @BelongsTo(() => Theater, { as: 'Theater' })
  theater: Theater;

  @ForeignKey(() => Movies)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  movieId: string;

  @BelongsTo(() => Movies, { as: 'Movie' })
  movie: Movies;

  @Column({
    type: DataType.TIME,
    allowNull: true,
  })
  startTime: string;

  @Column({
    type: DataType.TIME,
    allowNull: true,
  })
  endTime: string;

  @HasMany(() => ShowTimeSeat)
  showTimeSeats: ShowTimeSeat[];
}

export default ShowTime;
