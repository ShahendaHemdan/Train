import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';
import { TripDTO } from './TripDto';

export class TicketDTO {
  @IsNumber()
  price: number;

  @IsNumber()
  availTic: number;

  @ValidateNested()
  @Type(() => TripDTO)
  trip: TripDTO; // Change to singular, representing the one-to-one relationship

  constructor(ticketData: { price: number; availTic: number; trip: TripDTO }) {
    this.price = ticketData.price || 0;
    this.availTic = ticketData.availTic || 0;
    this.trip = ticketData.trip ;
  }

  static createFromPlainObject(obj: { price: number; availTic: number; trip: TripDTO }): TicketDTO {
    const ticketDTO = new TicketDTO({
      price: obj.price || 0,
      availTic: obj.availTic || 0,
      trip: obj.trip ,
    });

    return ticketDTO;
  }
}
