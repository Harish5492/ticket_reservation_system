import User from '../../common/database/entities/user.entity';
import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as utilities from '../../helpers/utilies.service';
import UsersService from '../user/user.service';
import { MESSAGES, TIME } from '../../constants';

@Injectable()
export class TokensService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async refreshTokens(userId: string, refreshToken: string) {
    const user: User = await this.userService.getUser({ id: userId });
    if (!user.refreshToken)
      throw new UnauthorizedException(MESSAGES.ERROR.ACCESS_DENIED);

    user.refreshToken = await utilities.decryptCipher(user.refreshToken);
    user.refreshToken = JSON.parse(String(user.refreshToken));
    if (refreshToken !== user.refreshToken)
      throw new UnauthorizedException(MESSAGES.ERROR.ACCESS_DENIED);

    const tokens = await this.getTokens(
      { userId: user.id, emailId: user.mobileNumber },
      TIME.JWT.FIVE_DAYS,
    );

    return tokens;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await utilities.encryptCipher(refreshToken);
    await this.userService.updateUser(
      { id: userId },
      { refreshToken: hashedRefreshToken },
    );
  }

  async getTokens(data: any, expiresIn: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { ...data },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: TIME.JWT.FIVE_DAYS,
        },
      ),

      this.jwtService.signAsync(
        { userId: data.userId },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: TIME.JWT.THIRTY_DAYS,
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
