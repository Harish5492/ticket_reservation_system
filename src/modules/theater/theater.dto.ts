import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

interface SeatConfiguration {
  gold: {
    rows: string[]; // 5 rows for gold
  };
  diamond: {
    rows: string[]; // 3 rows for diamond
  };
  normal: {
    rows: string[]; // 10 rows for normal
  };
}

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
  @IsObject()
  @ApiProperty({
    name: 'seatConfiguration',
    description: 'Show the seats of the theater as per the price',
    required: true,
    example: {
      gold: { rows: ['a1', 'a2', 'a3', 'a4', 'a5'] },
      diamond: { rows: ['b1', 'b2', 'b3'] },
      normal: {
        rows: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'],
      },
    },
  })
  seatConfiguration: SeatConfiguration; // Updated seat configuration with rows
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
