import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class addTheaterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'name',
    description: 'enter the Name of the Theater',
    required: true,
    example: 'PVR VR Punjab',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'location',
    description: 'enter the location of the theater',
    required: true,
    example: 'Punjab',
  })
  location: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'seatConfiguration',
    description: 'show the seats of the theater as per the price ',
    required: true,
    example: 'S25,S22',
  })
  seatConfiguration: object;
}

export class deleteTheaterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'id',
    description: 'enter the id of the theater to get the particular delete',
    required: true,
    example: 'd5c3100c9-09c8-4cb8-8b0f-974b7b780dae',
  })
  id: string;
}
