import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../common/database/entities';
import { throwError } from '../../helpers/responseHandeler';
import * as Utilities from '../../helpers/utilies.service';
import TwilioService from '../../helpers/twilio.service';
import * as UserDto from './user.dto';
import { USER_REPOSITORY, MESSAGES, TIME } from 'src/constants';
import { TokensService } from '../tokens/token.service';

@Injectable()
export default class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    private readonly tokenService: TokensService,
  ) {}
  async userMobileNumber(data: UserDto.IUserMobileNumberDto): Promise<object> {
    const { mobileNumber } = data;
    const expirationDate = new Date(Date.now() + TIME.OTP.OTP_EXPIRES);
    const [otp, isUserExists] = await Promise.all([
      Utilities.generateOtp(),
      this.isMobileNumberExists(mobileNumber),
    ]);
    await TwilioService.sendMessage({
      otp: otp,
      to: '',
    });
    const userOperation = isUserExists
      ? this.updateUser({ mobileNumber }, { otp, expirationDate })
      : this.userRepository.create<User>({ mobileNumber, otp, expirationDate });

    await userOperation;
    return { mobileNumber };
  }

  async registerLogin(
    data: UserDto.IUserLoginRegistrationDto,
  ): Promise<{ message: string }> {
    const { mobileNumber, otp } = data;
    await this.otpError(mobileNumber, otp);
    const tokens = await this.getJwtTokens(
      { mobileNumber: mobileNumber },
      true,
      TIME.JWT.THIRTY_DAYS,
    );
    await this.updateUser(
      { mobileNumber },
      { isOtpUsed: true, refreshToken: tokens.refreshToken },
    );

    return { message: MESSAGES.API_INFO.REGISTRATION_LOGIN_SUCCESSFUL };
  }

  async otpError(mobileNumber: string, otp: string) {
    const user = await this.getUser({ mobileNumber });
    if (user.otp !== otp) throwError(MESSAGES.ERROR.INVALID_OTP);
    if (new Date() > user.expirationDate)
      throwError(MESSAGES.ERROR.OTP_EXPIRES);
    if (user.isOtpUsed === true) throwError(MESSAGES.ERROR.OTP_USED);
  }

  async mobileExists(
    data: UserDto.IUserMobileNumberDto,
  ): Promise<{ message: string }> {
    const emailExists = await this.userRepository.findOne({
      where: { mobileNumber: data.mobileNumber },
    });
    if (emailExists) {
      return { message: MESSAGES.API_INFO.MOBILE_NUMBER_EXISTS };
    }
    return { message: MESSAGES.API_INFO.MOBILE_NUMBER_AVAILABLE };
  }

  async isMobileNumberExists(mobileNumber: string) {
    return await this.userRepository.findOne({
      where: { mobileNumber },
    });
  }

  async getUser(match: object): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { ...match },
    });

    return user;
  }

  async updateUser(match: object, data: object): Promise<void> {
    await this.userRepository.update({ ...data }, { where: { ...match } });
  }

  async getJwtTokens(
    data: any,
    isAccessNedeed: boolean,
    time: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const tokens = await this.tokenService.getTokens(data, time);
    if (isAccessNedeed)
      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
    return tokens;
  }
}
