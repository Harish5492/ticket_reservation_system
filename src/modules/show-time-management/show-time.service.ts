import { Inject } from '@nestjs/common';
import ShowTime from 'src/common/database/entities/showTime.entity';
import { MESSAGES, SHOWTIME_REPOSITORY } from 'src/constants';
import {
  addShowtimeDto,
  deleteShowtimeDto as idShowTimeFucntionsDto,
  getShowtimeDto,
} from './show-time.dto';
import { throwError } from 'src/helpers/responseHandeler';
import Theater from 'src/common/database/entities/theater.entity';
import Movies from 'src/common/database/entities/movies.entity';

export class ShowTimeService {
  constructor(
    @Inject(SHOWTIME_REPOSITORY)
    private readonly showTimeRepository: typeof ShowTime,
  ) {}
  async addShowTime(data: addShowtimeDto) {
    const { movieId, theaterId } = data;
    const showTime = await this.getShowTime({ movieId, theaterId });
    if (showTime) throwError(MESSAGES.SHOWTIME.SHOWTIME_ALREADY_EXISTS);
    await this.showTimeRepository.create({ ...data });
  }

  async deleteShowTime(data: idShowTimeFucntionsDto) {
    const { id } = data;
    await this.showTimeRepository.destroy({
      where: { id },
    });
  }

  async getShowTime(match: object): Promise<ShowTime> {
    return await this.showTimeRepository.findOne({
      where: { ...match },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
  }

  async getShowTimeSeats(data: idShowTimeFucntionsDto): Promise<ShowTime> {
    const { id } = data;
    const { theaterId, movieId } = await this.getShowTime({ id });
    const movieShowTimeSeats = await this.showTimeRepository.findOne({
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [
        {
          model: Theater,
          as: 'Theater',
          where: { id: theaterId },
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: Movies,
          as: 'Movie',
          where: { id: movieId },
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
    });
    return movieShowTimeSeats;
  }
}
