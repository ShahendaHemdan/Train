import { Module } from '@nestjs/common';
import { ControllersController } from './controllers/controllers.controller';
import { ServicesService } from './services/services.service';
import { User } from 'src/TypeORM/entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  
  ],
  controllers: [ControllersController, AuthController],
  providers: [ServicesService, AuthService],
})
export class UsersModule {
  
}
