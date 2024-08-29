import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
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
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  forgotPasswordToken: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  })
  isTokenUsed: boolean;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  refreshToken: string;
}

export default User;
