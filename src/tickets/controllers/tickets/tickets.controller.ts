import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { TicketsService } from 'src/tickets/services/tickets/tickets.service';
import {  Response } from "express"
import { TicketDTO } from 'src/TypeORM/DTOs/TicketDto';

@Controller('tickets')
export class TicketsController {
    constructor(private ticketService:TicketsService){}

    @Get()
    async getAllTickets(){
        const tickets=await this.ticketService.findAllTickets();
        
        if(tickets[0]){
            //Map Station Obj To Dto
            const ticketDTO = tickets.map(ticket => TicketDTO.createFromPlainObject(ticket));
            return ticketDTO;
        }else{
            throw new HttpException('There are no Tickets',HttpStatus.NOT_FOUND);
        }
    }


  @Get(':id')
  async getTicketById(@Param('id',ParseIntPipe) id:number){
    const ticket=await this.ticketService.findTicketById(id);
    if(ticket[0]){
        return ticket;
    }else{
        throw new HttpException('Ticket Not Found',HttpStatus.NOT_FOUND);
    }
  }


    @Post('create')
    async createTicket(@Body() ticketData: any,@Res() res:Response) {
        const { tripId, ...ticketDetails } = ticketData;
        const ticket= this.ticketService.createTcketWithDetails(tripId, ticketDetails);
        if(ticket){
            return res.status(200).send({msg:"Ticket Added Successfully"})
        }else{
            throw new HttpException('Something Went Wrong ',HttpStatus.BAD_REQUEST);
        }
    }


  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateTicket(@Param('id',ParseIntPipe) id:number,@Body() ticketData: any){
    const { tripId, ...ticketDetails } = ticketData;
    const updatedTicket=await this.ticketService.updateTicket(id,tripId,ticketDetails);
    if(updatedTicket.affected){
        return 'Ticket Updated successfly ';
    }else{
        throw new HttpException('Ticket Not Updated',HttpStatus.BAD_REQUEST);
    }
    }

    @Delete(':id')
    async deletTicket(@Param('id',ParseIntPipe) id:number){
        const deletedTicket=await this.ticketService.deleteTicket(id);
        if(deletedTicket.affected){
            return 'Ticket Deleted successfly';
        }else{
            throw new HttpException('There is no such Ticket',HttpStatus.NOT_FOUND);
        }
    }

}




