import { Table, Model, DataType, Column, HasMany } from 'sequelize-typescript';
import Auditorium from './auditorium.entity';

@Table
export class Theater extends Model<Theater> {
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
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  contact: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  totalAuditoriums: number;

  @HasMany(() => Auditorium)
  auditoriums: Auditorium[];
}

export default Theater;
