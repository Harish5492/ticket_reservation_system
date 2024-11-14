import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { API_OPERATIONS, MESSAGES } from 'src/constants';
import {
  addShowtimeDto,
  deleteShowtimeDto,
  getShowtimeDto,
} from './show-time.dto';
import { ShowTimeService } from './show-time.service';
import { successResponse } from 'src/helpers/responseHandeler';

@ApiTags('SHOWTIME')
@Controller('SHOWTIME')
export class ShowtimeController {
  constructor(private readonly showTimeService: ShowTimeService) {}

  @ApiOperation(API_OPERATIONS.SHOWTIME.ADD_SHOWTIME)
  @Post('add-showTime')
  async addShowTime(@Body() body: addShowtimeDto): Promise<any> {
    try {
      await this.showTimeService.addShowTime(body);
      return successResponse(MESSAGES.SHOWTIME.ADD_SHOWTIME);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('get-showtime-timing/:theaterId/:movieId')
  async getShowtimeTiming(@Param() param: getShowtimeDto): Promise<any> {
    try {
      const result = await this.showTimeService.getShowTime(param);
      return successResponse(MESSAGES.SHOWTIME.GET_SHOWTIME, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('get-showtime-seats/:id')
  async getShowTimeSeats(@Param() param: deleteShowtimeDto): Promise<any> {
    try {
      const result = await this.showTimeService.getShowTimeSeats(param);
      return successResponse(MESSAGES.SHOWTIME.GET_SHOWTIME, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete('delete-showTime/:id')
  async deleteShowtime(@Param() param: deleteShowtimeDto): Promise<any> {
    try {
      await this.showTimeService.deleteShowTime(param);
      return successResponse(MESSAGES.SHOWTIME.DELETE_SHOWTIME);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
