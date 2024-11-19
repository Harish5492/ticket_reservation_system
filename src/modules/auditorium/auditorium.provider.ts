import Auditorium from 'src/common/database/entities/auditorium.entity';
import Seat from 'src/common/database/entities/seat.entity';
import { AUDITORIUM_REPOSITORY, SEAT_REPOSITORY } from 'src/constants';

export const AuditoriumProvider = [
  {
    provide: AUDITORIUM_REPOSITORY,
    useValue: Auditorium,
  },
  {
    provide: SEAT_REPOSITORY,
    useValue: Seat,
  },
];
