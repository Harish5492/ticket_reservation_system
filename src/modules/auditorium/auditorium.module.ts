import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database/database.module';
import { AuditoriumProvider } from './auditorium.provider';
import { AuditoriumService } from './auditorium.service';
import { AuditoriumController } from './auditorium.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AuditoriumController],
  providers: [...AuditoriumProvider, AuditoriumService],
})
export class AuditoriumModule {}
