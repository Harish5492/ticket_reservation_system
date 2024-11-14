import ShowTime from 'src/common/database/entities/showTime.entity';
import { SHOWTIME_REPOSITORY } from 'src/constants';

export const ShowTimeProvider = [
  {
    provide: SHOWTIME_REPOSITORY,
    useValue: ShowTime,
  },
];
