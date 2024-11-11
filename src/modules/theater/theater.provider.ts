import Theater from 'src/common/database/entities/theater.entity';
import { THEATER_REPOSITORY } from 'src/constants';

export const theaterProvider = [
  {
    provide: THEATER_REPOSITORY,
    useValue: Theater,
  },
];
