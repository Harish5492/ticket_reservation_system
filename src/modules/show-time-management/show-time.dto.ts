import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class addShowtimeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'movieId',
    description: 'enter the id of the movie ',
    required: true,
    example: 'd5c3100c9-09c8-4cb8-8b0f-974b7b780dae',
  })
  movieId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'theaterId',
    description: 'enter the id of the theater',
    required: true,
    example: 'd5c3100c9-09c8-4cb8-8b0f-974b7b780dae',
  })
  theaterId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'startTime',
    description:
      'Enter the start time of the movie (e.g., "14:30:00" for 2:30 PM)',
    required: true,
    example: '14:30:00',
  })
  startTime: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'endTime',
    description: 'Enter the end time of the movie ',
    required: true,
    example: '17:30:30',
  })
  endTime: string;
}

export class deleteShowtimeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'id',
    description: 'Enter the id of the showtime',
    required: true,
    example: 'd5c3100c9-09c8-4cb8-8b0f-974b7b780dae',
  })
  id: string;
}

export class getShowtimeDto extends PickType(addShowtimeDto, [
  'theaterId',
  'movieId',
] as const) {}
