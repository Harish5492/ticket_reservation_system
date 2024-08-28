import { Module } from '@nestjs/common';
import { TokensController } from './token.controller';
import { TokensService } from './token.service'; // Make sure the import path is correct
import { RefreshTokenStrategy } from './stratergies/refreshToken.strategy';
import { AccessTokenStrategy } from './stratergies/accessToken.strategy';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../../common/database/database.module'; // Ensure DatabaseModule is imported
import UsersService from '../user/user.service';
import { userProviders } from '../user/user.provider';

@Module({
  imports: [JwtModule.register({}), DatabaseModule],
  controllers: [TokensController],
  providers: [
    TokensService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    UsersService,
    ...userProviders,
  ],
  exports: [TokensService],
})
export class TokensModule {}
