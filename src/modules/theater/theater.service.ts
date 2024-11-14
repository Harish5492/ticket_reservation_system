import { Inject } from '@nestjs/common';
import Theater from 'src/common/database/entities/theater.entity';
import { MESSAGES, THEATER_REPOSITORY } from 'src/constants';
import {
  addTheaterDto,
  deleteTheaterDto,
  filterTheaterDto,
} from './theater.dto';
import { throwError } from 'src/helpers/responseHandeler';
import { WhereOptions } from 'sequelize';

export class TheaterService {
  constructor(
    @Inject(THEATER_REPOSITORY)
    private readonly theaterRepository: typeof Theater,
  ) {}
  async addTheater(data: addTheaterDto): Promise<void> {
    const { name, location } = data;
    const theater = await this.getTheater({ name, location });
    if (theater) throwError(MESSAGES.THEATER.THEATER_ALREADY_ADDED);
    await this.theaterRepository.create({ ...data });
  }

  async getAllTheaters(
    filters: filterTheaterDto,
  ): Promise<{ list: Array<Theater>; totalCount: number }> {
    const { location, name } = filters;
    const where: WhereOptions = {};
    if (location) where.location = location;
    if (name) where.name = name;
    const { rows: theaters, count } =
      await this.theaterRepository.findAndCountAll({
        where,
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
    return { list: theaters, totalCount: count };
  }

  async deleteTheater(data: deleteTheaterDto): Promise<void> {
    const { id } = data;
    const theater = await this.getTheater({ ...data });
    if (!theater) throwError(MESSAGES.THEATER.THEATER_NOT_EXISTS);
    await this.theaterRepository.destroy({ where: { id } });
  }

  async getTheater(match: object): Promise<Theater> {
    return await this.theaterRepository.findOne({
      where: { ...match },
    });
  }
}
