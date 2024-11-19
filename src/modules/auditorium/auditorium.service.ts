import { Inject, Injectable } from '@nestjs/common';
import Auditorium from 'src/common/database/entities/auditorium.entity';
import Seat from 'src/common/database/entities/seat.entity';
import {
  AUDITORIUM_REPOSITORY,
  MESSAGES,
  SEAT_REPOSITORY,
} from 'src/constants';
import {
  addAuditoriumDTO,
  getAuditoriumDTO,
  SeatLayoutDTO,
  seatsTypeConfig,
} from './auditorium.dto';
import { throwError } from 'src/helpers/responseHandeler';
import Theater from 'src/common/database/entities/theater.entity';
import Movies from 'src/common/database/entities/movies.entity';

@Injectable()
export class AuditoriumService {
  constructor(
    @Inject(AUDITORIUM_REPOSITORY)
    private readonly auditoriumRepository: typeof Auditorium,
    @Inject(SEAT_REPOSITORY)
    private readonly seatRepository: typeof Seat,
  ) {}

  async addAuditorium(data: addAuditoriumDTO): Promise<void> {
    const { name, totalRows, seatsPerRow, seatsTypeConfig, theaterId } = data;
    if (!name || !theaterId || totalRows <= 0) {
      throwError(MESSAGES.AUDITORIUM.INVALID_AUDI_DETAILS);
    }
    if (seatsPerRow.length !== totalRows) {
      throwError(MESSAGES.AUDITORIUM.SEAT_PER_ROW_MUST_MATCH_TOTALROWS);
    }
    const auditorium = await this.auditoriumRepository.create({
      name,
      theaterId,
    });
    const seats = this.generateSeatLayout(
      auditorium.id,
      totalRows,
      seatsPerRow,
      seatsTypeConfig,
    );
    await this.seatRepository.bulkCreate(seats);
  }

  async getAuditoriumByTheater(data: getAuditoriumDTO): Promise<Auditorium> {
    const { theaterId } = data;
    return await this.auditoriumRepository.findOne({
      where: { theaterId },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [
        {
          model: Seat,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        // {
        //   model: Movies,
        //   attributes: {
        //     exclude: ['createdAt', 'updatedAt'],
        //   },
        // },
      ],
    });
  }

  private getSeatType(
    rowIndex: number,
    seatTypeConfig: seatsTypeConfig[],
  ): 'gold' | 'diamond' | 'normal' {
    for (const config of seatTypeConfig) {
      if (rowIndex >= config.startRow && rowIndex <= config.endRow) {
        return config.type;
      }
    }
    return 'normal';
  }

  private generateSeatLayout(
    auditoriumId: string,
    totalRows: number,
    seatsPerRow: number[],
    seatTypeConfig: seatsTypeConfig[],
  ): SeatLayoutDTO[] {
    const seats: SeatLayoutDTO[] = [];

    seatsPerRow.forEach((seatCount, rowIndex) => {
      const rowName = String.fromCharCode(65 + rowIndex); // Generate row name (A, B, C, etc.)
      const seatType = this.getSeatType(rowIndex, seatTypeConfig); // Determine seat type

      for (let seatNumber = 1; seatNumber <= seatCount; seatNumber++) {
        seats.push({
          auditoriumId,
          row: rowName,
          seatNumber,
          type: seatType,
          isActive: true,
        });
      }
    });

    return seats;
  }
}
