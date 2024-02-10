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
import { UserTicket } from 'src/TypeORM/entities/UserTicket ';
import { ServicesService } from 'src/users/services/services.service';
import { ControllersController } from 'src/users/controllers/controllers.controller';
import { User } from 'src/TypeORM/entities/User';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket,Trip,Train,UserTicket,User]),
  PassportModule,
  JwtModule.register({
    secret: 'abc123',
    signOptions: { expiresIn: '1h' },
  }),],
  controllers: [TicketsController, BookingController,ControllersController],
  providers: [TicketsService, BookingService,TripsService,TrainsService,ServicesService]
})
export class TicketsModule {}
