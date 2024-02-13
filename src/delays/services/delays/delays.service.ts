import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Delay } from 'src/TypeORM/entities/Delay';
import { DelayDTO } from 'src/TypeORM/DTOs/DelayDto';
import { Trip } from 'src/TypeORM/entities/Trip';
import { TripsService } from 'src/trips/services/trips/trips.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventEmitter2 } from '@nestjs/event-emitter';



@Injectable()
export class DelaysService  {

    
    constructor(
        @InjectRepository(Delay) private delayRepository: Repository<Delay>,
        @InjectRepository(Trip) private tripRepository: Repository<Trip>,
        private tripsService: TripsService,
        private eventEmitter: EventEmitter2
    ) {
       
    }





    findAllDelays() {
        return this.delayRepository.find({ relations: ["Trip",  "Station"] });
    }


    findDelayById(id: number) {
        return this.delayRepository.findOne({ where: { id }, relations: ["Trip",  "Station"] });

    }



    async createDelaytWithDetails(delayDetails: DelayDTO): Promise<Delay> {

        const newDelay = this.delayRepository.create(delayDetails);
        const createdDelay = await this.delayRepository.save(newDelay);
    
        return createdDelay;


    }



    async updateDelay(id: number, delayDetails: Delay): Promise<Delay> {

        // Update the delay record
        await this.delayRepository.update({ id }, delayDetails);

        // Retrieve the updated delay entity
        const updatedDelay = await this.findDelayById(id);

        return updatedDelay;

    }

    deleteDelay(id: number) {
        return this.delayRepository.delete({ id });
    }


    @Cron(CronExpression.EVERY_10_SECONDS)
    async processDelaysAutomatically() {
        const delays = await this.delayRepository.find({ relations: ['Trip'], where: { processed: false } });
    
        for (const delay of delays) {
            const trip = await this.tripsService.findTripById(delay.Trip.id);
    
            if (trip) {
                // Get the current arrival time and add delay duration
                const newArrTime = new Date(trip.arrTime.getTime() + delay.duration * 60000); // Convert minutes to milliseconds
    
                // Update the trip's arrival time
                trip.arrTime = newArrTime;
    
                // Save the updated trip
                await this.tripRepository.save(trip);
    
                // Mark the delay as processed
                delay.processed = true;
    

                this.eventEmitter.emit('Delay Added');


                
                // Save the updated delay
                await this.delayRepository.save(delay);
            }
        }
    }



   
}


