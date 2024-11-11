import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database/database.module';
import { TheaterController } from './theater.controller';
import { theaterProvider } from './theater.provider';
import { TheaterService } from './theater.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule],
  controllers: [TheaterController],
  providers: [...theaterProvider, TheaterService, JwtService],
})
export class theaterModule {}
