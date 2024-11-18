import { Inject } from '@nestjs/common';
import Auditorium from 'src/common/database/entities/auditorium.entity';
import { AUDITORIUM_REPOSITORY } from 'src/constants';
import { TheaterService } from './theater.service';

export class AuditoriumService {
  constructor(
    @Inject(AUDITORIUM_REPOSITORY)
    private readonly auditoriumRepository: typeof Auditorium,
    private readonly theaterService: TheaterService,
  ) {}
}
