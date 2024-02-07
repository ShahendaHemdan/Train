import { Module } from '@nestjs/common';
import { StationsService } from './services/stations/stations.service';
import { StationsController } from './controllers/stations/stations.controller';
import { Station } from 'src/TypeORM/entities/Station';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Station])],
  providers: [StationsService],
  controllers: [StationsController]
})
export class StationsModule {}
