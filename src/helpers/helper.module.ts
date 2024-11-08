import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { CronService } from './cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MovieMangementService } from 'src/modules/movie-management/movie-management.service';
import { movieMangementProvier } from 'src/modules/movie-management/movie-management.provider';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [
    RedisService,
    CronService,
    MovieMangementService,
    ...movieMangementProvier,
  ],
  exports: [RedisService, CronService],
})
export class HelpersModule {}
