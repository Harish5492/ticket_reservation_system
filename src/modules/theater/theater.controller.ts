import {
  Body,
  Controller,
  Delete,
  HttpException,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MESSAGES } from 'src/constants';
import { addTheaterDto, deleteTheaterDto } from './theater.dto';
import { successResponse } from 'src/helpers/responseHandeler';
import { TheaterService } from './theater.service';

@ApiTags('THEATER')
@Controller('theater')
export class TheaterController {
  constructor(
    @Inject()
    private readonly theaterService: TheaterService,
  ) {}
  @Post('add-theater')
  async addTheater(@Body() body: addTheaterDto): Promise<any> {
    try {
      await this.theaterService.addTheater(body);
      return successResponse(MESSAGES.THEATER.ADD_THEATER);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete('delete-theater')
  async deleteTheater(@Body() body: deleteTheaterDto): Promise<any> {
    try {
      await this.theaterService.deleteTheater(body);
      return successResponse(MESSAGES.THEATER.DELETE_THEATER);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
