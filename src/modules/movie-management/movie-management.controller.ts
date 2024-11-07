import {
  Post,
  Controller,
  Body,
  Param,
  Query,
  HttpException,
  UseGuards,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MovieMangementService } from './movie-management.service';
import * as movieMangementDto from './movie-management.dto';
import { successResponse } from 'src/helpers/responseHandeler';
import { API_OPERATIONS, MESSAGES } from 'src/constants';
import { AccessTokenGuard } from 'src/common/guard/accessTokenGuard';
import { GetParamsRequestDto } from '../user/user.dto';
import { RatingService } from './rating.service';
import { User } from 'src/common/decorators';

@ApiTags('MOVIE-MANAGEMENT')
@Controller('movie-management')
export class MovieManagementController {
  constructor(
    private readonly movieMangementService: MovieMangementService,
    private readonly ratingService: RatingService,
  ) {}

  /* This API only for admin */
  //   @ApiBearerAuth()
  //   @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.MOVIES.ADD_MOVIE)
  @Post('add-movie')
  async addMovie(@Body() body: movieMangementDto.addMovieDto): Promise<any> {
    try {
      await this.movieMangementService.addMovie(body);
      return successResponse(MESSAGES.MOVIE.ADD_MOVIE);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  @ApiOperation(API_OPERATIONS.MOVIES.ALL_MOVIES)
  @Get('get-all-movies/:page/:limit')
  async getAllMovies(@Param() params: GetParamsRequestDto): Promise<any> {
    try {
      const result = await this.movieMangementService.getAllMovies(params);
      return successResponse(MESSAGES.MOVIE.ALL_MOVIES, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @ApiOperation(API_OPERATIONS.MOVIES.GET_PARTICULAR_MOVIE)
  @Get('get-movie/:id')
  async getMovie(@Param() param: movieMangementDto.getMovieDto): Promise<any> {
    try {
      const result =
        await this.movieMangementService.getDatafromMovieTable(param);
      return successResponse(MESSAGES.MOVIE.DATA_FETCHED, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  /* This API is only for Admin */
  //   @ApiBearerAuth()
  //   @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.MOVIES.UPDATE_MOVIE)
  @Put('update-movie/:id')
  async updateMovie(
    @Param() param: movieMangementDto.getMovieDto,
    @Body() data: movieMangementDto.addMovieDto,
  ): Promise<any> {
    try {
      await this.movieMangementService.updateMovie(param, data);
      return successResponse(MESSAGES.MOVIE.UPDATED_MOVIE);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  /* This API is only for Admin */
  //   @ApiBearerAuth()
  //   @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.MOVIES.DELETE_MOVIE)
  @Delete('delete-movie/:id')
  async deleteMovie(
    @Param() param: movieMangementDto.getMovieDto,
  ): Promise<any> {
    try {
      await this.movieMangementService.deleteMovie(param);
      return successResponse(MESSAGES.MOVIE.DELETED_MOVIE);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  @ApiOperation(API_OPERATIONS.MOVIES.SEARCHED_MOVIE)
  @Get('search-movie/:page/:limit')
  async searchMovie(
    @Query() query: movieMangementDto.searchMovieDto,
    @Param() param: GetParamsRequestDto,
  ): Promise<any> {
    try {
      const result = await this.movieMangementService.searchMovie(query, param);
      return successResponse(MESSAGES.MOVIE.DATA_FETCHED, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @ApiOperation(API_OPERATIONS.MOVIES.NEW_MOVIES)
  @Get('new-movies/:page/:limit')
  async newMovies(@Param() params: GetParamsRequestDto): Promise<any> {
    try {
      const result = await this.movieMangementService.newMovies(params);
      return successResponse(MESSAGES.MOVIE.DATA_FETCHED, result);
    } catch (error) {
      throw new HttpException(error.message, error);
    }
  }

  //   @ApiBearerAuth()
  //   @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.MOVIES.ADD_RATING)
  @Post('add-rating')
  async addRating(
    @Body() body: movieMangementDto.movieRatingDto,
    @User() user: Record<string, any>,
  ): Promise<any> {
    try {
      const userId = user.userId;
      await this.ratingService.addRating(body, userId);
      return successResponse(MESSAGES.MOVIE.RATING_ADDED);
    } catch (error) {
      throw new HttpException(error.message, error);
    }
  }

  //   @ApiBearerAuth()
  //   @UseGuards(AccessTokenGuard)
  @Put('update-rating')
  async updateRating(
    @Body() body: movieMangementDto.movieRatingDto,
    @User() user: Record<string, any>,
  ): Promise<any> {
    try {
      const userId = user.userId;
      await this.ratingService.updateRating(body, userId);
      return successResponse(MESSAGES.MOVIE.RATING_UPDATED);
    } catch (error) {
      throw new HttpException(error.message, error);
    }
  }

  //   @ApiBearerAuth()
  //   @UseGuards(AccessTokenGuard)
  @Delete('update-rating')
  async deleteRating(
    @Body() movieId: movieMangementDto.deleteRatingDto,
    @User() user: Record<string, any>,
  ): Promise<any> {
    try {
      const userId = user.userId;
      await this.ratingService.deleteRating(movieId, userId);
      return successResponse(MESSAGES.MOVIE.RATING_DELETED);
    } catch (error) {
      throw new HttpException(error.message, error);
    }
  }

  @Get('get-average-rating/:id')
  async getAverageRating(
    movieId: movieMangementDto.deleteRatingDto,
  ): Promise<any> {
    try {
      const result =
        await this.ratingService.updateAvergeRatingOfTheMovie(movieId);
      return successResponse(MESSAGES.MOVIE.DATA_FETCHED, result);
    } catch (error) {
      throw new HttpException(error.message, error);
    }
  }
}
