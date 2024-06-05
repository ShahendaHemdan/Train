import { IsString, IsNotEmpty, IsDate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TrainTripDTO } from './TrainTripDto';
import { Trip } from '../entities/Trip';

export class TripForTicketDto {
  id: number;
  name: string;
  arrTime: string;
  deptTime: string;
  origin: string;
  destination: string;
  train: TrainTripDTO;

  constructor(data: TripForTicketDto) {
    this.id = data?.id || 0;
    this.name = data.name;
    this.arrTime = data.arrTime;
    this.deptTime = data.deptTime;
    this.origin = data.origin;
    this.destination = data.destination;
  }

  static createFromEntity(entity: Trip): TripForTicketDto {
    const tripDTO = new TripForTicketDto({
      id: entity.id,
      name: entity.name,
      arrTime: entity.arrTime,
      deptTime: entity.deptTime,
      origin: entity.origin,
      destination: entity.destination,
      train: TrainTripDTO.fromPlainObject(entity.train),
    });

    return tripDTO;
  }
}
