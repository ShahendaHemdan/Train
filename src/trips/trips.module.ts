import { Module } from '@nestjs/common';
import { TripsService } from './services/trips/trips.service';
import { TripsController } from './controllers/trips/trips.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from 'src/TypeORM/entities/Trip';
import { TrainsService } from 'src/trains/services/trains/trains.service';
import { TrainsController } from 'src/trains/controllers/trains/trains.controller';
import { Train } from 'src/TypeORM/entities/Train';
import { Route } from 'src/TypeORM/entities/Route';
import { Station } from 'src/TypeORM/entities/Station';

@Module({
  imports: [TypeOrmModule.forFeature([Trip,Train,Route,Station])],
  providers: [TripsService,TrainsService],
  controllers: [TripsController,TrainsController]
})
export class TripsModule {}
