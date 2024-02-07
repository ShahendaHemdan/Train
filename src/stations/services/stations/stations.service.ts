import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StationDTO } from 'src/TypeORM/DTOs/StationDto';
import { Station } from 'src/TypeORM/entities/Station';
import { Repository } from 'typeorm';

@Injectable()
export class StationsService {
    constructor(@InjectRepository(Station) private stationRepository:Repository<Station>){

    }
    findAllStations(){
        return this.stationRepository.find();
    }


    findStationById(id:number){
        return this.stationRepository.findBy({id});
    }

    createStation(staionDetails:Station){
        const newStation=this.stationRepository.create(staionDetails);
        return this.stationRepository.save(newStation);
    }

    updateStation(id:number,staionDetails:Station){
        console.log(staionDetails);
        return this.stationRepository.update({ id },staionDetails)
    }

    deleteStation(id:number){
        return this.stationRepository.delete({id});
    }
}




