import { Inject } from '@nestjs/common';
import Rating from 'src/common/database/entities/rating.entity';
import { MESSAGES, RATING_REPOSITORY } from 'src/constants';
import { movieRatingDto } from './movie-management.dto';
import { throwError } from 'src/helpers/responseHandeler';

export class RatingService {
  constructor(
    @Inject(RATING_REPOSITORY) private readonly ratingRepository: typeof Rating,
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

  async deleteRating(movieId: string, userId: string): Promise<void> {
    const ratingByUser = await this.getRatingByUser(userId, movieId);
    if (!ratingByUser) throwError(MESSAGES.MOVIE.RATING_NOT_GIVEN);
    await this.ratingRepository.destroy({
      where: { userId, movieId },
    });
  }

  async getRatingByUser(userId: string, movieId: string) {
    return await this.ratingRepository.findOne({
      where: { userId, movieId },
    });
  }
}
