import {
  Post,
  Controller,
  Body,
  HttpException,
  Get,
  UseGuards,
  Req,
  Query,
  Param,
  Put,
} from '@nestjs/common';
import UserService from './user.service';
import * as usersDto from './user.dto';
import { User } from '../../common/decorators';
import { successResponse } from '../../helpers/responseHandeler';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { API_OPERATIONS, MESSAGES } from 'src/constants';
@ApiTags('USERS')
@Controller('users')
export class UserController {
  constructor(private readonly userservice: UserService) {}

  @Get('status')
  async healthCheck() {
    return 'Server is Working';
  }

  @ApiOperation(API_OPERATIONS.USER.REGISTER_USER)
  @Post('register')
  async register(@Body() body: usersDto.IUserRegisterDto): Promise<any> {
    try {
      const result = await this.userservice.register(body);
      return successResponse(MESSAGES.USER.SIGN_UP_SUCCESS, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @ApiOperation(API_OPERATIONS.USER.EMAIL_EXITS)
  @Post('emailExists')
  async emailExists(@Body() body: usersDto.IEmailExistsDto): Promise<any> {
    try {
      console.log('yoooo');
      const result = await this.userservice.emailExists(body);
      return successResponse(MESSAGES.USER.EMAIL_EXISTS, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @ApiOperation(API_OPERATIONS.USER.FORGOT_PASSWORD)
  @Post('forgotPassword')
  async forgotPassword(@Body() body: usersDto.IEmailExistsDto): Promise<any> {
    try {
      const result = await this.userservice.forgotPassword(body);
      return successResponse(MESSAGES.USER.FORGOT_PASSWORD_LINK, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @ApiOperation(API_OPERATIONS.USER.RESET_PASSWORD)
  @Post('resetPassword/:id')
  async resetPassword(
    @Body() body: usersDto.IResetPasswordDto,
    @Param() params: usersDto.IForgotPasswordParams,
    @Query() query: usersDto.IForgotPasswordQuery,
  ): Promise<any> {
    try {
      const result = await this.userservice.resetPassword(body, params, query);
      return successResponse(MESSAGES.USER.RESET_PASSWORD, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @ApiOperation(API_OPERATIONS.USER.LOGIN_USER)
  @Post('login')
  async login(@Body() body: usersDto.ILoginDto): Promise<any> {
    try {
      const result = await this.userservice.login(body);
      return successResponse(MESSAGES.USER.LOGGED_IN, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
