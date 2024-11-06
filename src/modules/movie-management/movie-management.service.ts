import { Inject } from '@nestjs/common';
import * as movieMangementDto from './movie-management.dto';
import { Movies } from 'src/common/database/entities/movies.entity';
import { MESSAGES, MOVIE_REPOSITORY } from 'src/constants';
import { throwError } from 'src/helpers/responseHandeler';
import { GetParamsRequestDto } from '../user/user.dto';
import { WhereOptions } from 'sequelize';

export class MovieMangementService {
  constructor(
    @Inject(MOVIE_REPOSITORY) private readonly movieRepository: typeof Movies,
  ) {}
  async addMovie(data: movieMangementDto.addMovieDto) {
    const { title } = data;
    const movie = await this.getDatafromMovieTable({ title });
    if (movie) throwError(MESSAGES.MOVIE.MOVIE_ALREADY_ADDED);
    await this.movieRepository.create({ ...data });
  }

  async getAllMovies(params: GetParamsRequestDto) {
    const { page, limit } = params;
    return await this.movieRepository.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'posterUrl'],
      },
      limit: limit,
      offset: (page - 1) * limit,
    });
  }

  async updateMovie(
    userId: movieMangementDto.getMovieDto,
    data: movieMangementDto.addMovieDto,
  ) {
    const { id } = userId;
    return await this.movieRepository.update(
      { ...data },
      {
        where: { id },
      },
    );
  }

  async deleteMovie(userId: movieMangementDto.getMovieDto) {
    const { id } = userId;
    return await this.movieRepository.destroy({
      where: { id },
    });
  }

  async searchMovie(
    filter: movieMangementDto.searchMovieDto,
    param: GetParamsRequestDto,
  ): Promise<{ list: Array<Movies>; totalCount: number }> {
    const { format, title, duration, releaseDate, genre, language } = filter;
    const { page, limit } = param;
    const where: WhereOptions<Movies> = {};
    if (format) where.format = format;
    if (title) where.title = title;
    if (duration) where.duration = duration;
    if (releaseDate) where.releaseDate = releaseDate;
    if (genre) where.genre = genre;
    if (language) where.language = language;

    const { count, rows: movies } = await this.movieRepository.findAndCountAll({
      where,
      limit: limit,
      offset: (page - 1) * limit,
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'posterUrl'],
      },
    });
    return { list: movies, totalCount: count };
  }

  async newMovies(params: GetParamsRequestDto) {
    const { page, limit } = params;
    return await this.movieRepository.findAll({
      order: [['createdAt', 'DESC']],
      limit: limit,
      offset: (page - 1) * limit,
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'posterUrl'],
      },
    });
  }

  async getTop10movies() {
    return await this.movieRepository.findAll({
      order: [['averageRating', 'DESC']],
      limit: 10,
    });
  }

  async getDatafromMovieTable(match: object) {
    return await this.movieRepository.findOne({
      where: { ...match },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'posterUrl'],
      },
    });
  }
}
