import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {   Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from 'src/TypeORM/entities/Trip';
import { Train } from 'src/TypeORM/entities/Train';
import { TrainsService } from 'src/trains/services/trains/trains.service';


@Injectable()
export class TripsService {


    constructor(@InjectRepository(Trip) private tripRepository:Repository<Trip>,
    @InjectRepository(Train) private trainRepository: Repository<Train>,
    ){
    
    }
    findAllTrips(){
        return this.tripRepository.find({relations:["train","delays"]});
    }


    findTripById(id:number){
        return this.tripRepository.findOne({ where: { id }, relations: ["train","delays"] });

    }




    async createTripWithDetails( trainId: number, tripDetails: Partial<Trip>): Promise<Trip> {
        const train = await this.trainRepository.findOne({ where: { id: trainId } });

        if (!train) {
            throw new HttpException('Train not found', HttpStatus.NOT_FOUND);
        }

        const newTrip = this.tripRepository.create({
            ...tripDetails,
            arrTime: tripDetails.arrTime || new Date(),
            train: train,
        });

        return this.tripRepository.save(newTrip);
    }

    updateTrip(id:number,tripDetails:Trip){
        return this.tripRepository.update({ id },tripDetails)
    }

    deleteTrip(id:number){
        return this.tripRepository.delete({id});
    }



}
