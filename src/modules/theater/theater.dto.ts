import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class addTheaterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'name',
    description: 'Enter the name of the theater',
    required: true,
    example: 'PVR VR Punjab',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'location',
    description: 'Enter the location of the theater',
    required: true,
    example: 'Punjab',
  })
  location: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'contact',
    description: 'enter the contact number so a customer can ask any queries',
    required: true,
    example: 'harish@gmail.com',
  })
  contact: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    name: 'totalAuditoriums',
    description: 'enter the totalAuditoriums  a theater has',
    required: true,
    example: 5,
  })
  totalAuditoriums: number;
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

export class filterTheaterDto {
  @IsOptional()
  @ApiProperty({
    name: 'name',
    description: 'enter the Name of the Theater',
    required: false,
    example: 'PVR VR Punjab',
  })
  name?: string;

  @IsOptional()
  @ApiProperty({
    name: 'location',
    description: 'enter the location of the theater',
    required: false,
    example: 'Punjab',
  })
  location?: string;
}
