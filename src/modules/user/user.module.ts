import { Module } from '@nestjs/common';
import UsersService from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../../common/database/database.module';
import { userProviders } from './user.provider';
import { JwtService } from '@nestjs/jwt';
import { TokensService } from '../tokens/token.service';
import { OuthController } from './outh.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController, OuthController],
  providers: [UsersService, ...userProviders, JwtService, TokensService],
  exports: [...userProviders, UsersService],
})
export class UsersModule {}
