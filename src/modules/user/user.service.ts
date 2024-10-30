import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../common/database/entities';
import { throwError } from '../../helpers/responseHandeler';
import * as Utilities from '../../helpers/utilies.service';
import TwilioService from '../../helpers/twilio.service';
import * as UserDto from './user.dto';
import { USER_REPOSITORY, MESSAGES, TIME } from 'src/constants';
import { TokensService } from '../tokens/token.service';
import { WhereOptions } from 'sequelize';

@Injectable()
export default class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    private readonly tokenService: TokensService,
  ) {}
  async userMobileNumber(data: UserDto.IUserMobileNumberDto): Promise<object> {
    const { mobileNumber } = data;
    if (
      mobileNumber.length !== 10 ||
      !['6', '7', '8', '9'].includes(mobileNumber[0])
    )
      throwError(MESSAGES.ERROR.INVALID_MOBILE_NO);
    const expirationDate = new Date(Date.now() + TIME.OTP.OTP_EXPIRES);
    const [otp, isUserExists] = await Promise.all([
      Utilities.generateOtp(),
      this.isMobileNumberExists(mobileNumber),
    ]);
    // await TwilioService.sendMessage({
    //   otp: otp,
    //   to: '',
    // });
    const userOperation = isUserExists
      ? this.updateUser(
          { mobileNumber },
          { otp, expirationDate, isOtpUsed: false },
        )
      : this.userRepository.create<User>({
          mobileNumber,
          otp,
          expirationDate,
          role: 'CUSTOMER',
        });

    await userOperation;
    return { mobileNumber };
  }

  async registerLogin(
    data: UserDto.IUserLoginRegistrationDto,
  ): Promise<object> {
    const { mobileNumber, otp } = data;
    const user = await this.getUser({ mobileNumber });
    await this.otpError(mobileNumber, otp);
    const tokens = await this.getJwtTokens(
      { mobileNumber: mobileNumber, userId: user.id },
      true,
      TIME.JWT.THIRTY_DAYS,
    );
    await this.updateUser(
      { mobileNumber },
      {
        isOtpUsed: true,
        refreshToken: tokens.refreshToken,
        isMobileNumberVerified: true,
      },
    );

    return tokens;
  }
  async googleLogin(req: any): Promise<object | string> {
    console.log('google login', req.user);

    if (!req.user) {
      return MESSAGES.ERROR.GOOGLE_USER_FAILED;
    }
    let user = await this.getUser({ email: req.user.email });
    if (!user) {
      user = await this.userRepository.create({ ...req.user });
    }
    const tokens = await this.getJwtTokens(
      { email: req.user.email, userId: user.id },
      true,
      TIME.JWT.THIRTY_DAYS,
    );
    await this.updateUser(
      { email: req.user.email },
      {
        isOtpUsed: true,
        refreshToken: tokens.refreshToken,
        isEmailVerified: true,
      },
    );
    return tokens;
  }

  async editProfile(data: UserDto.IEditUserProfile, id: string): Promise<void> {
    await this.updateUser({ id }, { ...data });
  }

  async getUsers(
    params: UserDto.GetParamsRequestDto,
    query: UserDto.IFilterTOGetUser,
  ): Promise<{ list: Array<User>; totalCount: number }> {
    const { page = 1, limit = 10 } = params;
    const { id, mobileNumber } = query;
    const where: WhereOptions<User> = {};
    if (id) where.id = id;
    if (mobileNumber) where.mobileNumber = mobileNumber;

    const { rows: users, count } = await this.userRepository.findAndCountAll({
      where,
      limit: limit,
      offset: (page - 1) * limit,
      attributes: {
        exclude: [
          'id',
          'createdAt',
          'updatedAt',
          'otp',
          'isOtpUsed',
          'refreshToken',
          'expirationDate',
          'role',
        ],
      },
    });
    return { list: users, totalCount: count };
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
    return emailExists
      ? { message: MESSAGES.API_INFO.MOBILE_NUMBER_EXISTS }
      : { message: MESSAGES.API_INFO.MOBILE_NUMBER_AVAILABLE };
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
