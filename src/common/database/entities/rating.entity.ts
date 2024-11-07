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
export class Rating extends Model<Rating> {
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
    type: DataType.INTEGER,
    validate: { min: 1, max: 5 },
  })
  rating: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  comments: string;
}

export default Rating;
