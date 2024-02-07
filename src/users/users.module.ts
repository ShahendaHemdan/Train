import { Module } from '@nestjs/common';
import { ControllersController } from './controllers/controllers.controller';
import { ServicesService } from './services/services.service';
import { User } from 'src/TypeORM/entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [ControllersController],
  providers: [ServicesService]
})
export class UsersModule {}
