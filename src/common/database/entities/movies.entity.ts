import { Table, Column, Model, DataType } from 'sequelize-typescript';

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
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.ENUM(
      'COMEDY',
      'HORROR',
      'ACTION',
      'DRAMA',
      'THRILLER',
      'FASTASY',
      'SCIENCE FICTION',
      'ADVENTURE',
      'ANIMATION',
      'DOCUMENTARY',
      'CRIME',
    ),
    allowNull: false,
  })
  genre: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  duration: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  releaseDate: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  posterUrl: string;
}
