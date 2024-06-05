import { Module } from '@nestjs/common';
import { RouteService } from './services/route/route.service';
import { RouteController } from './controllers/route/route.controller';
import { Route } from 'src/TypeORM/entities/Route';
import { Trip } from 'src/TypeORM/entities/Trip';
import { Station } from 'src/TypeORM/entities/Station';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Route,Trip,Station])],
  providers: [RouteService],
  controllers: [RouteController]
})
export class RouteModule {}
