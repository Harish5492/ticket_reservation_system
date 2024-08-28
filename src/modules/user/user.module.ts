import { Module } from '@nestjs/common';
import UsersService from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../../common/database/database.module';
import { userProviders } from './user.provider';
import { JwtService } from '@nestjs/jwt';
import { TokensService } from '../tokens/token.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UsersService, ...userProviders, JwtService, TokensService],
  exports: [...userProviders, UsersService],
})
export class UsersModule {}
