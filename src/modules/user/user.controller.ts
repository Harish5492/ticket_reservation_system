import {
  Post,
  Controller,
  Body,
  HttpException,
  Get,
  UseGuards,
  Query,
  Param,
} from '@nestjs/common';
import UserService from './user.service';
import * as usersDto from './user.dto';
import { User } from '../../common/decorators';
import { successResponse } from '../../helpers/responseHandeler';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { API_OPERATIONS, MESSAGES } from 'src/constants';
import { AccessTokenGuard } from 'src/common/guard/accessTokenGuard';
@ApiTags('USERS')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('status')
  async healthCheck() {
    return 'Server is Working';
  }

  @ApiOperation(API_OPERATIONS.USER.ENTER_MOBILE_NUMBER)
  @Post('user-mobileNumber')
  async userMobileNumber(
    @Body() body: usersDto.IUserMobileNumberDto,
  ): Promise<any> {
    try {
      const result = await this.userService.userMobileNumber(body);
      return successResponse(
        MESSAGES.USER.MOBILE_NUMBER_GIVEN_SUCCESSFULLY,
        result,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status.status);
    }
  }

  @ApiOperation(API_OPERATIONS.USER.REGISTER_LOGIN_USER)
  @Post('register-login')
  async register(
    @Body() body: usersDto.IUserLoginRegistrationDto,
  ): Promise<any> {
    try {
      const result = await this.userService.registerLogin(body);
      return successResponse(MESSAGES.USER.SIGN_UP_SUCCESS, result);
    } catch (error) {
      throw new HttpException(error.message, error.status.status);
    }
  }

  @ApiOperation(API_OPERATIONS.USER.MOBILE_EXISTS)
  @Post('mobile-exists')
  async mobileExits(@Body() body: usersDto.IUserMobileNumberDto): Promise<any> {
    try {
      const result = await this.userService.mobileExists(body);
      return successResponse(MESSAGES.USER.MOBILE_NUMBER_EXISTS, result);
    } catch (error) {
      throw new HttpException(error.message, error.status.status);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.USER.EDIT_USER_PROFILE)
  @Post('edit-profile')
  async editProfile(
    @Body() body: usersDto.IEditUserProfile,
    @User() user: Record<string, any>,
  ): Promise<any> {
    try {
      const userId = user.userId;
      await this.userService.editProfile(body, userId);
      return successResponse(MESSAGES.USER.PROFILE_UPDATED);
    } catch (error) {
      throw new HttpException(error.message, error.status.status);
    }
  }

  /* This API is only for Admin */
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.USER.EDIT_USER_PROFILE)
  @Get('get-users/:page/:limit')
  async getUsers(
    @Query() query: usersDto.IFilterTOGetUser,
    @Param() params: usersDto.GetParamsRequestDto,
  ): Promise<any> {
    try {
      const result = await this.userService.getUsers(params, query);
      return successResponse(MESSAGES.USER.PROFILE_UPDATED, result);
    } catch (error) {
      throw new HttpException(error.message, error.status.status);
    }
  }
}
