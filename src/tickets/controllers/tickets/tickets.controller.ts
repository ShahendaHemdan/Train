import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { TicketsService } from 'src/tickets/services/tickets/tickets.service';
import { Response } from "express"
import { TripsService } from 'src/trips/services/trips/trips.service';
import { Ticket } from 'src/TypeORM/entities/Tickets';

@Controller('tickets')
export class TicketsController {
    constructor(private ticketService: TicketsService,
        private tripService: TripsService
    ) { }

    @Get()
    async getAllTickets(@Res() res: Response) {
        const tickets = await this.ticketService.findAllTickets();

        if (tickets[0]) {
            //Map Station Obj To Dto
            // const ticketDTO = tickets.map(ticket => TicketDTO.createFromPlainObject(ticket));
            return res.status(200).json({ status: HttpStatus.OK, data: tickets })
        } else {
            return res.status(404).json({ status: HttpStatus.NOT_FOUND, msg: 'There are no Tickets' })
        }
    }


    @Get(':id')
    async getTicketById(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        const ticket = await this.ticketService.findTicketById(id);
        if (ticket) {
            return res.status(200).json({ status: HttpStatus.OK, data: ticket })

        } else {
            return res.status(404).json({ status: HttpStatus.NOT_FOUND, msg: 'Ticket Not Found' })

        }
    }


    @Post('create')
    async createTicket(@Body() ticketData: Ticket, @Res() res: Response) {
        //Check in Trip Id
        const trip = await this.tripService.findTripById(ticketData.trips[0].id);
        if (!trip) {
            return res.status(404).json({ status: HttpStatus.NOT_FOUND, msg: 'trip not found' });
        } else {
            const ticket = this.ticketService.createTcketWithDetails(ticketData);
            if (ticket) {
                return res.status(201).send({ status: HttpStatus.CREATED, msg: "Ticket Added Successfully" });
            } else {
                return res.status(400).json({ status: HttpStatus.BAD_REQUEST, msg: 'Something Went Wrong ' });

            }
        }

    }


    @Patch(':id')
    @UsePipes(ValidationPipe)
    async updateTicket(@Param('id', ParseIntPipe) id: number, @Body() ticketData: Ticket, @Res() res: Response) {
        const updatedTicket = await this.ticketService.updateTicket(id, ticketData);
        if (updatedTicket.affected) {
            return res.status(200).json({ status: HttpStatus.OK, msg: 'Ticket Updated successfly ' });

        } else {
            return res.status(400).json({ status: HttpStatus.BAD_REQUEST, msg: 'Ticket Not Updated' });

        }
    }

    @Delete(':id')
    async deletTicket(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        const deletedTicket = await this.ticketService.deleteTicket(id);
        if (deletedTicket.affected) {
            return res.status(200).json({ status: HttpStatus.OK, msg: 'Ticket Deleted successfly' })
        } else {
            return res.status(404).json({ status: HttpStatus.NOT_FOUND, msg: 'There is no such Ticket' })

        }
    }

}




