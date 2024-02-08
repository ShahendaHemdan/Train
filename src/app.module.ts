import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './TypeORM/entities/User';
import { TrainsModule } from './trains/trains.module';
import { Train } from './TypeORM/entities/Train';
import { Station } from './TypeORM/entities/Station';
import { StationsModule } from './stations/stations.module';
import { Trip } from './TypeORM/entities/Trip';
import { TripsModule } from './trips/trips.module';
import { TicketsModule } from './tickets/tickets.module';
import { Ticket } from './TypeORM/entities/Tickets';
import { Delay } from './TypeORM/entities/Delay';
import { DelaysModule } from './delays/delays.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserTicket } from './TypeORM/entities/UserTicket ';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'railway',
      entities: [User,Train,Station,Trip,Ticket,Delay,UserTicket],
      synchronize: true,
    }),
    UsersModule,
    TrainsModule,
    StationsModule,
    TripsModule,
    TicketsModule,
    DelaysModule,
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
