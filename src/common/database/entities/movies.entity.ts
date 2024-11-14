import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import Rating from './rating.entity';
import ShowTime from './showTime.entity';

@Table
export class Movies extends Model<Movies> {
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
  title: string;

  @Column({
    type: DataType.ENUM(
      'Hindi',
      'English',
      'Telugu',
      'Tamil',
      'Kannada',
      'Malayalam',
      'Marathi',
      'Bengali',
      'Punjabi',
      'Sanskrit',
      'Gujrati',
      'Manipuri',
      'Odia',
    ),
    allowNull: true,
  })
  language: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.ENUM(
      'comedy',
      'Horror',
      'Action',
      'Drama',
      'Thriller',
      'Fastasy',
      'Science Fiction',
      'Adventure',
      'Animation',
      'Documentary',
      'Crime',
    ),
    allowNull: true,
  })
  genre: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  duration: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  releaseDate: string;

  @Column({
    type: DataType.ENUM('2D', '3D', 'IMAX2D'),
    allowNull: true,
  })
  format: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  averageRating: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  posterUrl: string;

  @HasMany(() => Rating)
  rating: Rating;

  @HasMany(() => ShowTime)
  movies: ShowTime;
}

export default Movies;
