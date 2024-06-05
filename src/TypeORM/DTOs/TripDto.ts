import { Trip } from '../entities/Trip';
import { DelayForTripDTO } from './DelayForTripDto';
import { TrainTripDTO } from './TrainTripDto';


export class TripDTO {
  id: number;
  name: string;
  arrTime: string;
  deptTime: string;
  origin: string;
  destination: string;
  train: TrainTripDTO;
  delays: DelayForTripDTO[];

  constructor(data: TripDTO) {
    this.id = data?.id || 0;
    this.name = data.name;
    this.arrTime = data.arrTime;
    this.deptTime = data.deptTime;
    this.origin = data.origin;
    this.destination = data.destination;
    this.train = data.train;
    this.delays = data.delays;
  }

  static createFromEntity(entity: Trip): TripDTO {
    const tripDTO = new TripDTO({
      id: entity.id,
      name: entity.name,
      arrTime: entity.arrTime,
      deptTime: entity.deptTime,
      origin: entity.origin,
      destination: entity.destination,
      train: TrainTripDTO.fromPlainObject(entity.train),
      delays: entity.delays ? entity.delays.map((delay) => DelayForTripDTO.createFromEntity(delay)) : [],
    });

    return tripDTO;
  }
}