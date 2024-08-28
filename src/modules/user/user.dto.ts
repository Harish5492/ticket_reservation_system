import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class IUserRegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    name: 'email',
    description: 'Send email if using logintype=EMAIL',
    example: 'harish@gmail.com',
    required: true,
  })
  email?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({
    name: 'fullName',
    description: 'fullname length should be 3 or more than that',
    example: 'Harish Rana',
    required: true,
  })
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    name: 'password',
    description: 'Password length should be 8 or more than that',
    example: '12345678',
    required: true,
  })
  password: string;
}

export class IEmailExistsDto extends PickType(IUserRegisterDto, [
  'email',
] as const) {}

export class IResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    name: 'password',
    description: 'Password length should be 8 or more than that',
    example: '12345678',
    required: true,
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    name: 'confirmPassword',
    description: 'Password length should be 8 or more than that',
    example: '12345678',
    required: true,
  })
  confirmPassword: string;
}

export class IForgotPasswordParams {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    name: 'id',
    description: 'Unique identifier for the user, should be a valid UUID.',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    required: true,
  })
  id: string;
}
export class IForgotPasswordQuery {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'token',
    description: 'Token for verifying the password reset request.',
    example: 'abc123token',
    required: true,
  })
  token: string;
}

export class ILoginDto extends PickType(IUserRegisterDto, [
  'email',
  'password',
] as const) {}
