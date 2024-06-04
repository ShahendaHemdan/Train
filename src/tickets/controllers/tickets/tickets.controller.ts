import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TicketsService } from 'src/tickets/services/tickets/tickets.service';
import { Response } from "express"
import { TripsService } from 'src/trips/services/trips/trips.service';
import { Ticket } from 'src/TypeORM/entities/Tickets';
import { Role } from 'src/decorators/roles.decorator';
import { AuthurizationGuard } from 'src/guards/Authorization.guard';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
@Role('admin')
@UseGuards(JwtAuthGuard,AuthurizationGuard)
@Controller('tickets')
export class TicketsController {
    constructor(private ticketService: TicketsService,
        private tripService: TripsService
    ) { }

    @Get()
    async getAllTickets(@Res() res: Response) {
        const tickets = await this.ticketService.findAllTickets();
        if (tickets[0]) {
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
        const trip=await this.ticketService.findTicketByTripId(ticketData.trip[0]);
        //Check in Trip Id
        const tripId = await this.tripService.findTripById(ticketData.trip[0].id);
        ticketData.trip=tripId;
        if (trip) {
            return res.status(400).json({ status: HttpStatus.NOT_FOUND, msg: 'This Trip Already Exists' });
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




