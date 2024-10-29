import { ApiProperty, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class IUserMobileNumberDto {
  @IsString()
  @ApiProperty({
    name: 'mobileNumber',
    description: 'enter the mobileNumber for register',
    example: '8872512811',
    required: true,
  })
  mobileNumber?: string;
}

export class IUserLoginRegistrationDto extends PickType(IUserMobileNumberDto, [
  'mobileNumber',
] as const) {
  @IsString()
  @ApiProperty({
    name: 'otp',
    description: 'enter the otp for registration or login of User',
    example: '12345',
    required: true,
  })
  otp?: string;
}

export class IEditUserProfile extends PickType(IUserMobileNumberDto, [
  'mobileNumber',
] as const) {
  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'firstName',
    description: 'enter the firstName of the user',
    example: 'Harish',
    required: false,
  })
  firstName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'lastName',
    description: 'enter the lastName of the User',
    example: 'Rana',
    required: false,
  })
  lastName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'email',
    description: 'Enter the email of the User',
    example: 'harishrana5492@gmail.com',
    required: false,
  })
  email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'pinCode',
    description: 'Enter the post office of the user address',
    example: '177103',
    required: false,
  })
  pinCode?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'city',
    description: 'Enter the city of the user address',
    example: 'Dehra ',
    required: false,
  })
  city?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'state',
    description: 'Enter the state of the user address',
    example: 'Himachal Pradesh',
    required: false,
  })
  state?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'country',
    description: 'Enter the country of the user address',
    example: 'India',
    required: false,
  })
  country?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'addressLine1',
    description: 'Enter the first line of the user address',
    example: 'Village Surajpur P.O. Dhaliara',
    required: false,
  })
  addressLine1?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'addressLine2',
    description: 'Enter the second line of the user address',
    example: 'Teh. Dehra Distt. Kangra',
    required: false,
  })
  addressLine2?: string;
}

export class IFilterTOGetUser {
  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'mobileNumber',
    description: 'enter the mobileNumber for register',
    example: '8872512811',
    required: false,
  })
  mobileNumber?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'id',
    description: 'get the unique id of the employee',
    example: '4ac1986c-924b-458f-8c40-234692d44f20',
    required: false,
  })
  id?: string;
}

export class GetParamsRequestDto {
  @ApiProperty({
    name: 'page',
    description: 'Default page = 1, Enter more than that to retrieve data.',
    example: 1,
    default: 1,
    required: true,
  })
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  page: number;

  @ApiProperty({
    name: 'limit',
    description: 'Default page = 10, Enter more than that to retrieve data.',
    example: 10,
    default: 10,
    required: true,
  })
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  limit: number;
}
