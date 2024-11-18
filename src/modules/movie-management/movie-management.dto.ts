import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class addMovieDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'description',
    required: false,
    description:
      'Koi Mil Gya movie is science fiction movie of around 3 hours having lot of fun, romance, and entertainment',
    example:
      'Koi Mil Gya movie is science fiction movie of around 3 hours having lot of fun, romance, and entertainment',
  })
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'title',
    required: false,
    description: 'Name of the Movie OR the Title of the Movie',
    example: 'Koi Mil Gya',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'genre',
    required: false,
    description:
      'Add the genre of the movie that is either it is Comedy, Romantic, Horror etc',
    example: 'Science Fiction',
  })
  genre: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    name: 'duration',
    required: false,
    description: 'Add the duration of the movie in hours as a decimal number',
    example: 2.5,
  })
  duration: number;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    name: 'releaseDate',
    required: false,
    description: 'Add the release date of the movie in ISO format (YYYY-MM-DD)',
    example: '2022-10-22',
  })
  releaseDate: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'posterUrl',
    required: false,
    description: 'Add the poster Url  of the movie',
    example:
      'https%3A%2F%2Fsimple.wikipedia.org%2Fwiki%2FJavaScript&psig=AOvVaw1ogE4I0ZLN9k37CPIaGMg2&ust=1730871627141000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMDW87W9xIkDFQAAAAAdAAAAABAE',
  })
  posterUrl: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'language',
    description: 'language of the movie which is used to film the scences',
    required: false,
    example: 'Hindi',
  })
  language: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'format',
    description: 'format of the movie either it is 2D or 3D',
    required: false,
    example: '2D',
  })
  format: string;
}

export class getMovieDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'id',
    description: 'enter the id of the movie to get the particular movie',
    required: true,
    example: 'd5c3100c9-09c8-4cb8-8b0f-974b7b780dae',
  })
  id: string;
}

export class searchMovieDto {
  @IsOptional()
  @ApiProperty({
    name: 'title',
    required: false,
    description: 'Name of the Movie OR the Title of the Movie',
    example: 'Koi Mil Gya',
  })
  title: string;

  @IsOptional()
  @ApiProperty({
    name: 'genre',
    required: false,
    description:
      'Add the genre of the movie that is either it is Comedy, Romantic, Horror etc',
    example: 'Science Fiction',
  })
  genre: string;

  @IsOptional()
  @ApiProperty({
    name: 'duration',
    required: false,
    description: 'Add the duration of the movie in hours as a decimal number',
    example: 2.5,
  })
  duration: number;

  @IsOptional()
  @ApiProperty({
    name: 'releaseDate',
    required: false,
    description: 'Add the release date of the movie in ISO format (YYYY-MM-DD)',
    example: '2022-10-22',
  })
  releaseDate: string;

  @IsOptional()
  @ApiProperty({
    name: 'posterUrl',
    required: false,
    description: 'Add the poster Url  of the movie',
    example:
      'https%3A%2F%2Fsimple.wikipedia.org%2Fwiki%2FJavaScript&psig=AOvVaw1ogE4I0ZLN9k37CPIaGMg2&ust=1730871627141000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMDW87W9xIkDFQAAAAAdAAAAABAE',
  })
  posterUrl: string;

  @IsOptional()
  @ApiProperty({
    name: 'language',
    description: 'language of the movie which is used to film the scences',
    required: false,
    example: 'Hindi',
  })
  language: string;

  @IsOptional()
  @ApiProperty({
    name: 'format',
    description: 'format of the movie either it is 2D or 3D',
    required: false,
    example: '2D',
  })
  format: string;
}

export class movieRatingDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'movie_id',
    description: 'enter the id of the movie to get the particular movie',
    required: true,
    example: 'd5c3100c9-09c8-4cb8-8b0f-974b7b780dae',
  })
  movie_id: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    name: 'rating',
    description:
      'add the rating of the movie as per 1 to 5, 1 is lowest in rating and 5 is highest',
    required: true,
    example: '4',
  })
  rating: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'comments',
    description: 'please add your comments for the movie ',
    required: false,
    example: 'this is very good movies',
  })
  comments: string;
}

export class idShowTimeFucntionsDto extends PickType(movieRatingDto, [
  'movie_id',
] as const) {}
