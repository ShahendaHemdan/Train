import { Body, Controller, Delete, HttpStatus, Param, ParseIntPipe, Post, Res, UseGuards } from '@nestjs/common';
import { UserTicket } from 'src/TypeORM/entities/UserTicket ';
import { BookingService } from 'src/tickets/services/booking/booking.service';
import { TicketsService } from 'src/tickets/services/tickets/tickets.service';
import { ServicesService } from 'src/users/services/services.service';
import { Response } from "express"
import { JwtAuthGuard } from 'src/guards/jwt.guard';
@UseGuards(JwtAuthGuard)
@Controller('booking')
export class BookingController {

    constructor(
        private userService: ServicesService,
        private ticketService: TicketsService,
        private bookingService: BookingService
    ) { }

    @Post()
    @Post('create')
    async bookTicket(@Body() bookingdata: UserTicket, @Res() res: Response) {
        const user = await this.userService.findUserById(bookingdata.user.id);
        const ticket = await this.ticketService.findTicketBy(bookingdata.ticket.id);
        if (!user[0] || !ticket[0] || !ticket[0].availTic) {
            return res.status(404).json({ status: HttpStatus.NOT_FOUND, msg: "There Are No Tickets" });
        } else {
            const booked = await this.bookingService.bookTicket(bookingdata);
            if (booked) {
                await this.ticketService.decrementTickets(bookingdata.ticket.id);
                return res.status(201).json({ status: HttpStatus.CREATED, msg: "Ticket is Booked Successfully" })
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

}
