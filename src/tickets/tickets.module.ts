import { Module } from '@nestjs/common';
import { TicketsController } from './controllers/tickets/tickets.controller';
import { TicketsService } from './services/tickets/tickets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from 'src/TypeORM/entities/Tickets';
import { Trip } from 'src/TypeORM/entities/Trip';
import { BookingController } from './controllers/booking/booking.controller';
import { BookingService } from './services/booking/booking.service';
import { TripsService } from 'src/trips/services/trips/trips.service';
import { Train } from 'src/TypeORM/entities/Train';
import { TrainsService } from 'src/trains/services/trains/trains.service';


@Module({
  imports: [TypeOrmModule.forFeature([Ticket,Trip,Train])],
  controllers: [TicketsController, BookingController],
  providers: [TicketsService, BookingService,TripsService,TrainsService]
})
export class TicketsModule {}
