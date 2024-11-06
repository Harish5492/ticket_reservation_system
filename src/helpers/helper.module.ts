import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { CronService } from './cron.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [RedisService, CronService],
  exports: [RedisService, CronService],
})
export class HelpersModule {}
