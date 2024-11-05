import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database/database.module';
import { movieManagementController } from './movie-management.controller';
import { movieMangementProvier } from './movie-management.provider';
import { movieMangementService } from './movie-management.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule],
  controllers: [movieManagementController],
  providers: [...movieMangementProvier, movieMangementService, JwtService],
})
export class MovieMangementModule {}
