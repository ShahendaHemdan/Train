import { Module } from '@nestjs/common';
import { TicketsController } from './controllers/tickets/tickets.controller';
import { TicketsService } from './services/tickets/tickets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from 'src/TypeORM/entities/Tickets';
import { Trip } from 'src/TypeORM/entities/Trip';
import { BookingController } from './controllers/booking/booking.controller';
import { BookingService } from './services/booking/booking.service';


@Module({
  imports: [TypeOrmModule.forFeature([Ticket,Trip])],
  controllers: [TicketsController, BookingController],
  providers: [TicketsService, BookingService]
})
export class TicketsModule {}
