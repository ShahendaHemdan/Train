import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserTicket } from 'src/TypeORM/entities/UserTicket ';
// import { User } from 'src/TypeORM/entities/User';
import { BookingService } from 'src/tickets/services/booking/booking.service';
import { TicketsService } from 'src/tickets/services/tickets/tickets.service';
import { ServicesService } from 'src/users/services/services.service';
import { Response } from "express"
import { JwtAuthGuard } from 'src/guards/jwt.guard';

import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from 'src/TypeORM/entities/Trip';
import { Repository } from 'typeorm';
@UseGuards(JwtAuthGuard)
@Controller('booking')
export class BookingController {

    constructor(
        private userService: ServicesService,
        private ticketService: TicketsService,
        private bookingService: BookingService,
        @InjectRepository(Trip)
        private readonly tripRepository: Repository<Trip>
    ) { }

    @Post(":tripId")
    async bookTicket(
        @Req() request: Request,
        @Body() bookingdata: UserTicket,
        @Param('tripId', ParseIntPipe) tripId: number,
        @Res() res: Response
      )  {

        // GET CURRENT LOGGED IN USER 
        const authorizationHeader = request.headers['authorization'];
        const token = authorizationHeader.split(' ')[1]; // Extract the token from the authorization         
        const decodedToken = jwt.decode(token);
        const userId = decodedToken.sub;            //extract id from the decoded token

        const user = await this.userService.findUserById(+userId);
       
        const trip = await this.tripRepository
        .createQueryBuilder('trip')
        .leftJoinAndSelect('trip.ticket', 'ticket') // Load the associated ticket
        .where('trip.id = :id', { id: tripId })
        .getOne();
      
      const ticket = trip.ticket;
    
      
      if (!user || !ticket || !trip || ticket.availTic <= 0) {
       
            return res.status(404).json({ status: HttpStatus.NOT_FOUND, msg: "There Are No Tickets" });
        } else {
            const availableTickets = ticket.availTic;
            const seatNum = Math.floor(Math.random() * availableTickets) + 1; 
            bookingdata.seatNumber = seatNum;
            bookingdata.ticket = ticket;
            bookingdata.trip = trip;
            bookingdata.user= user[0];
    
            const booked = await this.bookingService.bookTicket(bookingdata);
            if (booked) {
                await this.ticketService.decrementTickets(ticket.id);
                return res.status(201).json({ status: HttpStatus.CREATED, msg: "Ticket is Booked Successfully" });
            } else {
                return res.status(400).json({ status: HttpStatus.BAD_REQUEST, msg: "Try Again" });
            }
        }
    }


    @Delete(':id')
    async cancelBooking(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        const ticket = await this.bookingService.findBookingById(id);
        if (ticket) {
                this.bookingService.cancel(id);
                await this.ticketService.incrementTickets(ticket.ticket.id);
                return res.status(200).json({ status: HttpStatus.OK, msg: "Booking Canceled" })

        } else {
            return res.status(404).json({ status: HttpStatus.NOT_FOUND, msg: 'Ticket Not Found' })

        }
    }



    @Get()
    async allTickets(@Res() res: Response,@Req() request: Request,
){
        // GET CURRENT LOGGED IN USER 
        const authorizationHeader = request.headers['authorization'];
        const token = authorizationHeader.split(' ')[1]; // Extract the token from the authorization         
        const decodedToken = jwt.decode(token);
        const userId = decodedToken.sub;            //extract id from the decoded token

        const allTickets= await this.bookingService.findTicketsByUserId(+userId);
        return res.status(200).json({ status: HttpStatus.OK, data: allTickets });
    }
}
