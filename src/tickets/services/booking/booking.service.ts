import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTicket } from 'src/TypeORM/entities/UserTicket ';
import { Repository } from 'typeorm';

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(UserTicket)
        private readonly userTicketRepository: Repository<UserTicket>,
      ) {}

      async bookTicket(bookingData: UserTicket): Promise<UserTicket> {

                const newTicket = this.userTicketRepository.create(bookingData);
            
                return await this.userTicketRepository.save(newTicket);
                }
            

      }


