import { Cron } from '@nestjs/schedule';
import { RedisService } from './redis.service';
import { throwError } from './responseHandeler';
import { MovieMangementService } from 'src/modules/movie-management/movie-management.service';
import { REDIS_TABLES } from 'src/constants';

export class CronService {
  constructor(
    private readonly redisService: RedisService,
    private readonly movieMangementService: MovieMangementService,
  ) {}
  @Cron('*/10 * * * * *')
  async getTop10Movies() {
    try {
      const result = await this.movieMangementService.getTop10movies();
      console.log('======top 10 ======', result);
      await this.redisService.set(
        REDIS_TABLES.TOP_10_MOVIES,
        JSON.stringify(result),
      );
    } catch (error) {
      throwError(error.message, error);
    }
  }
}
