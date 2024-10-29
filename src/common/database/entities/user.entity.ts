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
    allowNull: true,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastName: string;

  @Column({
    type: DataType.ENUM('CUSTOMER', 'ADMIN'),
    defaultValue: 'CUSTOMER',
    allowNull: true,
  })
  role: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  mobileNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  otp: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  addressLine1: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  addressLine2: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  pinCode: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  city: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  state: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  country: string;
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  })
  isOtpUsed: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  expirationDate: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  refreshToken: string;
}

export default User;
