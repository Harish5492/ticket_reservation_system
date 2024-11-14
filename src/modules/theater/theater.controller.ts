import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { API_OPERATIONS, MESSAGES } from 'src/constants';
import {
  addTheaterDto,
  deleteTheaterDto,
  filterTheaterDto,
} from './theater.dto';
import { successResponse } from 'src/helpers/responseHandeler';
import { TheaterService } from './theater.service';

@ApiTags('THEATER')
@Controller('theater')
export class TheaterController {
  constructor(private readonly theaterService: TheaterService) {}

  /* Only for Admin */
  @ApiOperation(API_OPERATIONS.THEATER.ADD_THEATER)
  @Post('add-theater')
  async addTheater(@Body() body: addTheaterDto): Promise<any> {
    try {
      await this.theaterService.addTheater(body);
      return successResponse(MESSAGES.THEATER.ADD_THEATER);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @ApiOperation(API_OPERATIONS.SHOWTIME.GET_ALL_THEATERS)
  @Get('get-all-theaters')
  async getAllTheaters(@Query() query: filterTheaterDto): Promise<any> {
    try {
      const result = await this.theaterService.getAllTheaters(query);
      return successResponse(MESSAGES.THEATER.GET_ALL_THEATER, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  /* Only for Admin */
  @ApiOperation(API_OPERATIONS.THEATER.DELETE_THEATER)
  @Delete('delete-theater/:id')
  async deleteTheater(@Param() param: deleteTheaterDto): Promise<any> {
    try {
      await this.theaterService.deleteTheater(param);
      return successResponse(MESSAGES.THEATER.DELETE_THEATER);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
