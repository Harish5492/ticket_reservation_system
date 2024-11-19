import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { AuditoriumService } from './auditorium.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { addAuditoriumDTO, getAuditoriumDTO } from './auditorium.dto';
import { successResponse } from 'src/helpers/responseHandeler';
import { API_OPERATIONS, MESSAGES } from 'src/constants';

@ApiTags('AUDITORIUM')
@Controller('auditorium')
export class AuditoriumController {
  constructor(private readonly auditoriumService: AuditoriumService) {}

  @ApiOperation(API_OPERATIONS.AUDITORIUM.ADD_AUDITORIUM)
  @Post('add-auditorium-for-theater')
  async addAuditorium(@Body() body: addAuditoriumDTO): Promise<any> {
    try {
      await this.auditoriumService.addAuditorium(body);
      return successResponse(MESSAGES.AUDITORIUM.ADD_AUDITORIUM);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @ApiOperation(API_OPERATIONS.AUDITORIUM.GET_AUDITORIUM)
  @Get('get-auditorium-by-theater/:theaterId')
  async getAuditoriumByTheater(@Param() param: getAuditoriumDTO): Promise<any> {
    try {
      const result = await this.auditoriumService.getAuditoriumByTheater(param);
      return successResponse(MESSAGES.AUDITORIUM.GET_AUDITORIUM, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
