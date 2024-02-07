import { Trip } from "../entities/Trip";

export class TicketDTO {
    price: number;
    trip: Trip;

    constructor(ticketData: { price: number; Trip: Trip }) {
        this.price = ticketData.price || 0;
        this.trip = ticketData.Trip || new Trip();
    }

    static createFromPlainObject(obj: { price: number; Trip: Trip }): TicketDTO {
        const ticketDTO = new TicketDTO({
            price: obj.price || 0,
            Trip: obj.Trip,
        });

        return ticketDTO;
    }


}
