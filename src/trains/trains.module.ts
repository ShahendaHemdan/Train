import { Module } from '@nestjs/common';
import { TrainsService } from './services/trains/trains.service';
import { TrainsController } from './controllers/trains/trains.controller';
import { Train } from 'src/TypeORM/entities/Train';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Train])],
  providers: [TrainsService],
  controllers: [TrainsController]
})
export class TrainsModule {}
