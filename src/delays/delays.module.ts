import { Module } from '@nestjs/common';
import { DelaysService } from './services/delays/delays.service';
import { DelaysController } from './controllers/delays/delays.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from 'src/TypeORM/entities/Station';
import { Trip } from 'src/TypeORM/entities/Trip';
import { Train } from 'src/TypeORM/entities/Train';
import { TrainsService } from 'src/trains/services/trains/trains.service';
import { TripsService } from 'src/trips/services/trips/trips.service';
import { StationsService } from 'src/stations/services/stations/stations.service';
import { Delay } from 'src/TypeORM/entities/Delay';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [TypeOrmModule.forFeature([Station,Trip,Train,Delay]),
  ScheduleModule.forRoot(), 
],
  providers: [DelaysService,TrainsService,TripsService,StationsService,],
  controllers: [DelaysController]
})
export class DelaysModule {}
