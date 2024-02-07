import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'src/TypeORM/entities/Tickets';
import { Trip } from 'src/TypeORM/entities/Trip';

@Injectable()
export class TicketsService {
    constructor(@InjectRepository(Ticket) private ticketRepository:Repository<Ticket>,
    @InjectRepository(Trip) private tripRepository: Repository<Trip>,){

    }
    findAllTickets(){
        return this.ticketRepository.find({relations:["Trip"]});
    }


    findTicketById(id:number){
        return this.ticketRepository.findOne({ where: { id }, relations: ["Trip"] });

    }

    createTicket(ticketDetails:Trip){
        const newTicket=this.ticketRepository.create(ticketDetails);
        return this.ticketRepository.save(newTicket);
    }



    async createTcketWithDetails( tripId: number, ticketDetails: Partial<Ticket>): Promise<Ticket> {
        const trip = await this.tripRepository.findOne({ where: { id: tripId } });

        if (!trip) {
            throw new HttpException('trip not found', HttpStatus.NOT_FOUND);
        }

        const newTicket = this.ticketRepository.create({
            ...ticketDetails,
            Trip: trip,
        });

        return this.ticketRepository.save(newTicket);
    }

    async updateTicket(id:number,tripId: number,ticketDetails:Trip){
        const trip = await this.tripRepository.findOne({ where: { id: tripId } });
        if (!trip) {
            throw new HttpException('trip not found', HttpStatus.NOT_FOUND);
        }
        return this.ticketRepository.update({ id, Trip: trip }, ticketDetails);
    }

    deleteTicket(id:number){
        return this.ticketRepository.delete({id});
    }
}
