import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
