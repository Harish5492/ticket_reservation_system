import { Movies } from 'src/common/database/entities/movies.entity';
import Rating from 'src/common/database/entities/rating.entity';
import { MOVIE_REPOSITORY, RATING_REPOSITORY } from 'src/constants';

export const movieMangementProvier = [
  {
    provide: MOVIE_REPOSITORY,
    useValue: Movies,
  },
  {
    provide: RATING_REPOSITORY,
    useValue: Rating,
  },
];
