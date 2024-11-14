import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database/database.module';
import { MovieManagementController } from './movie-management.controller';
import { movieMangementProvier } from './movie-management.provider';
import { MovieMangementService } from './movie-management.service';
import { JwtService } from '@nestjs/jwt';
import { RatingService } from './rating.service';
import { RedisService } from 'src/helpers/redis.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MovieManagementController],
  providers: [
    ...movieMangementProvier,
    MovieMangementService,
    JwtService,
    RatingService,
    RedisService,
  ],
})
export class MovieMangementModule {}
