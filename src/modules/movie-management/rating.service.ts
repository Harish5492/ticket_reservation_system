import { Inject } from '@nestjs/common';
import Rating from 'src/common/database/entities/rating.entity';
import { MESSAGES, MOVIE_REPOSITORY, RATING_REPOSITORY } from 'src/constants';
import { deleteRatingDto, movieRatingDto } from './movie-management.dto';
import { throwError } from 'src/helpers/responseHandeler';
import Movies from 'src/common/database/entities/movies.entity';

export class RatingService {
  constructor(
    @Inject(RATING_REPOSITORY) private readonly ratingRepository: typeof Rating,
    @Inject(MOVIE_REPOSITORY) private readonly movieRepository: typeof Movies,
  ) {}

  async addRating(data: movieRatingDto, user_id: string): Promise<void> {
    const { movie_id } = data;
    const ratingByUser = await this.getRatingByUser(user_id, movie_id);
    if (ratingByUser) throwError(MESSAGES.MOVIE.RATING_ALREADY_GIVEN);
    await this.ratingRepository.create({
      ...data,
      movieId: movie_id,
      userId: user_id,
    });
    await this.updateAvergeRatingOfTheMovie(movie_id as any);
  }

  async updateRating(data: movieRatingDto, user_id: string): Promise<void> {
    const { movie_id } = data;
    const ratingByUser = await this.getRatingByUser(user_id, movie_id);
    if (!ratingByUser) throwError(MESSAGES.MOVIE.RATING_NOT_GIVEN);
    await this.ratingRepository.update(
      {
        ...data,
      },
      {
        where: { userId: user_id, movieId: movie_id },
      },
    );
  }

  async deleteRating(movieId: deleteRatingDto, userId: string): Promise<void> {
    const { movie_id } = movieId;
    const ratingByUser = await this.getRatingByUser(userId, movie_id);
    if (!ratingByUser) throwError(MESSAGES.MOVIE.RATING_NOT_GIVEN);
    await this.ratingRepository.destroy({
      where: { userId, movieId: movie_id },
    });
  }

  async getRatingByUser(userId: string, movieId: string) {
    return await this.ratingRepository.findOne({
      where: { userId, movieId },
    });
  }

  async updateAvergeRatingOfTheMovie(
    movieId: deleteRatingDto,
  ): Promise<object> {
    const { movie_id } = movieId;
    const ratings = await this.ratingRepository.findAll({
      where: { movieId: movie_id },
      attributes: ['rating'],
    });
    if (ratings.length === 0) throwError(MESSAGES.MOVIE.RATING_NOT_GIVEN);
    let averageRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    averageRating = averageRating / ratings.length;

    await this.movieRepository.update(
      { averageRating: parseFloat(averageRating.toFixed(2)) },
      { where: { id: movie_id } },
    );
    return { averageRating: parseFloat(averageRating.toFixed(2)) };
  }
}
