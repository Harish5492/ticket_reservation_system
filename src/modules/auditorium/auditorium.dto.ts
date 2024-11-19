import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export interface seatsTypeConfig {
  type: 'gold' | 'diamond' | 'normal';
  startRow: number;
  endRow: number;
}

export class addAuditoriumDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'theaterId',
    description: 'enter the id of the theater ',
    required: true,
    example: 'd5c3100c9-09c8-4cb8-8b0f-974b7b780dae',
  })
  theaterId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'name',
    description:
      'Enter the name of the Auditorium which beloges to particular theater',
    required: true,
    example: 'AUDI 1',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    name: 'totalRows',
    description: 'Enter the total number of the rows in the auditorium',
    required: true,
    example: 5,
  })
  totalRows: number;

  @IsNotEmpty()
  @ApiProperty({
    name: 'seatsPerRow',
    description: 'enter the seats as per the row',
    required: true,
    example: [10, 12, 14],
  })
  seatsPerRow: number[];

  @IsNotEmpty()
  @ApiProperty({
    name: 'seatsTypeConfig',
    description:
      'Enter the type of the seater as per the rows from startrow to endrow',
    required: true,
    example: [
      { type: 'diamond', startRow: 0, endRow: 1 },
      { type: 'gold', startRow: 2, endRow: 3 },
      { type: 'normal', startRow: 4, endRow: 4 },
    ],
  })
  seatsTypeConfig: seatsTypeConfig[];
}

export class getAuditoriumDTO extends PickType(addAuditoriumDTO, [
  'theaterId',
] as const) {}

export class SeatLayoutDTO {
  auditoriumId: string;
  row: string;
  seatNumber: number;
  type: 'gold' | 'diamond' | 'normal';
  isActive: boolean;
}
