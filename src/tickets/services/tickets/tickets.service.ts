import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'src/TypeORM/entities/Tickets';
import { Trip } from 'src/TypeORM/entities/Trip';

@Injectable()
export class TicketsService {
    constructor(@InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
        @InjectRepository(Trip) private tripRepository: Repository<Trip>,) {

    }
    findAllTickets() {
        return this.ticketRepository.find({ relations: ["trip"] });
    }


    findTicketById(id: number) {
        return this.ticketRepository.findOne({ where: { id }, relations: ["trip"] });

    }

   
    
    findTicketByTripId(trip: Trip) {
      return this.ticketRepository.findOne({ where: { trip }, relations: ["trip"] });
    }

    findTicketBy(id: number) {
        return this.ticketRepository.findBy({ id });

    }


    async createTcketWithDetails(ticketDetails: Ticket): Promise<Ticket> {
        const newTicket = this.ticketRepository.create(ticketDetails);

        return this.ticketRepository.save(newTicket);
    }

    async decrementTickets(id: number) {
        const ticket = await this.findTicketById(id);
        if (ticket && ticket.availTic) {
            const availTic = ticket.availTic - 1;
            return this.ticketRepository.update({ id }, { availTic });
        } else {
            return null;
        }


    }


    async incrementTickets(id: number) {
        const ticket = await this.findTicketById(id);
        if (ticket) {
            const availTic = ticket.availTic + 1;
            return this.ticketRepository.update({ id }, { availTic });
        } else {
            return null;
        }


    }

    async updateTicket(id: number, ticketDetails: Ticket) {
        const result = await this.ticketRepository.update(id, ticketDetails);
        return result;
    }

    deleteTicket(id: number) {
        return this.ticketRepository.delete({ id });
    }
}
