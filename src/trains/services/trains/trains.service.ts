import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Train } from 'src/TypeORM/entities/Train';
import { Repository } from 'typeorm';

@Injectable()
export class TrainsService {
    constructor(@InjectRepository(Train) private trainRepository:Repository<Train>){

    }
    findAllTrains(){
        return this.trainRepository.find();
    }


    findTrainById(id:number){
        return this.trainRepository.findBy({id});
    }

    createTrain(trainDetails:Train){
        const newTrain=this.trainRepository.create(trainDetails);
        return this.trainRepository.save(newTrain);
    }

    updateTrain(id:number,trainDetails:Train){
        return this.trainRepository.update({ id },trainDetails)
    }

    deleteTrain(id:number){
        return this.trainRepository.delete({id});
    }
}


