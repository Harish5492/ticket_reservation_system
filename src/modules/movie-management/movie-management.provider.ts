import { Movies } from 'src/common/database/entities/movies.entity';
import { MOVIE_REPOSITORY } from 'src/constants';

export const movieMangementProvier = [
  {
    provide: MOVIE_REPOSITORY,
    useValue: Movies,
  },
];
