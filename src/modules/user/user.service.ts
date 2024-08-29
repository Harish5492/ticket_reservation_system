import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from '../../common/database/entities';
import { throwError } from '../../helpers/responseHandeler';
import * as Utilities from '../../helpers/utilies.helper';
import EmailService from '../../helpers/smtp.helper';
import * as UserDto from './user.dto';
import { USER_REPOSITORY, MESSAGES, TIME, EM } from 'src/constants';
import { TokensService } from '../tokens/token.service';

@Injectable()
export default class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    private readonly tokenService: TokensService,
  ) {}

  async register(data: UserDto.IUserRegisterDto): Promise<{ message: string }> {
    const emailExits = await this.isEmailExits(data.email);
    if (emailExits) throwError(MESSAGES.ERROR.EMAIL_EXISTS);
    data.password = await Utilities.hashPassword(data.password);
    await this.userRepository.create<User>({ ...data });
    return { message: MESSAGES.API_INFO.REGISTRATION_SUCCESSFUL };
  }

  async emailExists(
    data: UserDto.IEmailExistsDto,
  ): Promise<{ message: string }> {
    const emailExists = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (emailExists) {
      return { message: MESSAGES.API_INFO.EMAIL_ALREADY_EXISTS };
    }
    return { message: MESSAGES.API_INFO.EMAIL_AVAILABLE };
  }

  async forgotPassword(
    data: UserDto.IEmailExistsDto,
  ): Promise<{ message: string }> {
    const emailExists = await this.isEmailExits(data.email);
    if (!emailExists) throwError(MESSAGES.ERROR.EMAIL_NOT_EXISTS);
    const token = await Utilities.encryptCipherWithTime(
      data.email,
      TIME.TOKEN.TOKEN_EXPIRES,
    );
    const encodedToken = encodeURIComponent(token);
    await this.updateUser(
      {
        email: emailExists.email,
      },
      {
        forgotPasswordToken: token,
        isTokenUsed: false,
      },
    );
    const link = `${EM.BASE_URL}/${emailExists.id}?token=${encodedToken}`;
    console.log(link);
    // await EmailService.sendMail(data.email, link);

    return { message: MESSAGES.API_INFO.FORGOT_PASSWORD_LINK };
  }
  async resetPassword(
    data: UserDto.IResetPasswordDto,
    params: UserDto.IForgotPasswordParams,
    query: UserDto.IForgotPasswordQuery,
  ): Promise<{ message: string }> {
    const { id } = params;
    const { token } = query;
    const decodedToken = decodeURIComponent(token);
    const userExists = await this.getUser({ id });
    if (!userExists) throwError(MESSAGES.ERROR.USER_NOT_EXIST);
    const decryptedToken = await Utilities.decryptCipherWithTime(decodedToken);
    if (userExists.email !== decryptedToken)
      throwError(MESSAGES.ERROR.INVALID_TOKEN);
    if (userExists.isTokenUsed === true) throwError(MESSAGES.ERROR.TOKEN_USED);
    if (data.password !== data.confirmPassword)
      throwError(MESSAGES.ERROR.PASSWORD_MISSMATCHED);
    data.password = await Utilities.hashPassword(data.password);
    await this.userRepository.update(
      { password: data.password, isTokenUsed: true },
      {
        where: { id },
      },
    );
    return { message: MESSAGES.API_INFO.RESET_PASSWORD };
  }
  async login(data: UserDto.ILoginDto): Promise<object> {
    const { password } = data;
    const User = await this.isEmailExits(data.email);
    if (!User) throwError(MESSAGES.ERROR.USER_NOT_EXIST);
    if (!(await Utilities.comparePassword(password, User.password))) {
      throwError(MESSAGES.ERROR.INCORRECT_PASSWORD);
    }
    const tokens = await this.getJwtTokens(
      { userId: User.id, email: User.email },
      true,
      TIME.JWT.THIRTY_DAYS,
    );

    await this.updateUser(
      { email: User.email },
      { refreshToken: tokens.refreshToken },
    );
    return tokens;
  }

  async isEmailExits(email: string) {
    return await this.userRepository.findOne({
      where: { email },
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
