import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import User from './user.entity';
import Movies from './movies.entity';

@Table
export class ShowTime extends Model<ShowTime> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  userId: string;

  @BelongsTo(() => User, { as: 'User' })
  user: User;

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
}

export default ShowTime;
