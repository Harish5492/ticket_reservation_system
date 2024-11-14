import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database/database.module';
import { ShowTimeProvider } from './show-time.provider';
import { ShowTimeService } from './show-time.service';
import { ShowtimeController } from './show-time.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...ShowTimeProvider, ShowTimeService],
  controllers: [ShowtimeController],
})
export class ShowTimeModule {}
