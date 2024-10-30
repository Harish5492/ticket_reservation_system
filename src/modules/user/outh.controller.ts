/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, HttpException, Get, UseGuards, Req } from '@nestjs/common';
import UserService from './user.service';
import { successResponse } from '../../helpers/responseHandeler';
import { AuthGuard } from '@nestjs/passport';
import { API_OPERATIONS, MESSAGES } from 'src/constants';
import { ApiOperation } from '@nestjs/swagger';
@Controller()
export class OuthController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation(API_OPERATIONS.USER.LOGIN_USER_WITH_GOOGLE)
  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: any) {}
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any) {
    try {
      await this.userService.googleLogin(req);
      return successResponse(MESSAGES.USER.GOOGLE_USER_SUCCESS);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
