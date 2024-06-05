/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Delay } from 'src/TypeORM/entities/Delay';
import { DelayDTO } from 'src/TypeORM/DTOs/DelayDto';
import { Trip } from 'src/TypeORM/entities/Trip';
import { TripsService } from 'src/trips/services/trips/trips.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Route } from 'src/TypeORM/entities/Route';
import moment from 'moment';




@Injectable()
export class DelaysService {


    constructor(
        @InjectRepository(Delay) private delayRepository: Repository<Delay>,
        @InjectRepository(Trip) private tripRepository: Repository<Trip>,
        @InjectRepository(Route) private routeRepository: Repository<Route>,
        private tripsService: TripsService,
        private eventEmitter: EventEmitter2
    ) {

    }





    findAllDelays() {
        return this.delayRepository.find({ relations: ["Trip", "Station"] });
    }


    findDelayById(id: number) {
        return this.delayRepository.findOne({ where: { id }, relations: ["Trip", "Station"] });

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
        const delays = await this.delayRepository.find({ relations: ['Trip','Station'], where: { processed: false } });
        for (const delay of delays) {
            const trip = await this.tripsService.findTripById(delay.Trip.id);


            if (trip) {
                // Get the current arrival time and add delay duration
                const newTime = this.addDelayToTime(trip.arrTime, delay.duration*60);
                
    
                // Get the current arrival time and add delay duration to stations
                const route = trip.route;

                if (route.station1.id === delay.Station.id) {
                    route.arrived1=true;
                    route.arrivalTime2 = this.addDelayToTime(route.arrivalTime2, delay.duration*60);
                    route.arrivalTime3 = this.addDelayToTime(route.arrivalTime3, delay.duration*60);
                    route.arrivalTime4 = this.addDelayToTime(route.arrivalTime4, delay.duration*60);

                } else if (route.station2.id === delay.Station.id) {
                    route.arrived1=true;
                    route.arrived2=true;
                    route.arrivalTime3 = this.addDelayToTime(route.arrivalTime3, delay.duration*60);
                    route.arrivalTime4 = this.addDelayToTime(route.arrivalTime4, delay.duration*60);

                } else if (route.station3.id === delay.Station.id) {
                    route.arrived1=true;
                    route.arrived2=true;
                    route.arrived3=true;
                    route.arrivalTime4 = this.addDelayToTime(route.arrivalTime4, delay.duration*60);
                } 
                else if (moment().isSame(route.arrivalTime4, 'minute')) {
                    route.arrived4 = true;
                }
    
                await this.routeRepository.save(route);
                
                // Update the trip's arrival time
                trip.arrTime = newTime;
    
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
    
    


    private addDelayToTime(time: string, delay: number): string {
        const timeParts = time.split(':');
        const hours = parseInt(timeParts[0]);
        const minutes = parseInt(timeParts[1]);
        const seconds = parseInt(timeParts[2]);
    
        const delayInSeconds = delay;
        const totalSeconds = hours * 3600 + minutes * 60 + seconds + delayInSeconds;
    
        const newHours = Math.floor(totalSeconds / 3600);
        const newMinutes = Math.floor((totalSeconds % 3600) / 60);
        const newSeconds = totalSeconds % 60;
      
        return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
    }


    private convertMillisecondsToTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
      
        return `${hours}:${minutes}:${seconds}`;
      }



}


