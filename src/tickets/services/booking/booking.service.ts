// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Ticket } from 'src/TypeORM/entities/Tickets';
// import { Repository } from 'typeorm';
// // import { BookingDto } from 'src/TypeORM/DTOs/BookingTicketDto';
// import { ServicesService } from '../../../users/services/services.service';
// import { TripsService } from 'src/trips/services/trips/trips.service';
// @Injectable()
export class BookingService {
//     constructor(
//         @InjectRepository(Ticket)
//         private readonly ticketRepository: Repository<Ticket>,
//         private readonly userService: ServicesService,
//         private readonly tripService: TripsService,
//       ) {}

//       async bookTicket(bookingDto: Ticket): Promise<Ticket> {
//         // const { userId, tripId, price, seatNumber } = bookingDto;

//       //    // Check if user and trip exist, otherwise handle as required
//       //       const user = await this.userService.findUserById(userId);
//       //       const trip = await this.tripService.findTripById(tripId);
//       //       if (!user || !trip) {
//       //           throw new NotFoundException('User or trip not found');
//       //       }else{
//       //           const newTicket = this.ticketRepository.create({
//       //               user,
//       //               trip,
//       //               price,
//       //               seatNumber,
//       //             });
              
//                   // return await this.ticketRepository.save(newTicket);
//         return bookingDto;
//                 }
//       //       }

//       // }
}
