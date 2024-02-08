import {  Injectable } from '@nestjs/common';
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
        return this.ticketRepository.find({relations:["trips"]});
    }


    findTicketById(id:number){
        return this.ticketRepository.findOne({ where: { id }, relations: ["trips"] });

    }


    async createTcketWithDetails( ticketDetails: Ticket): Promise<Ticket> {
        const newTicket = this.ticketRepository.create(ticketDetails);

        return this.ticketRepository.save(newTicket);
    }

    async updateTicket(id:number,ticketDetails:Ticket){
        return this.ticketRepository.update({ id }, ticketDetails);
    }

    deleteTicket(id:number){
        return this.ticketRepository.delete({id});
    }
}
