import { IsNotEmpty, IsString, } from 'class-validator';



export class TrainTripDTO {


    @IsNotEmpty()
    @IsString()
    name: string;




    constructor(train: TrainTripDTO) {
        this.name = train.name;
    }


    // Static method to create StationDTO objects from plain station objects
    static fromPlainObject(train: { name: string }): TrainTripDTO {
        const trainTripDTO = new TrainTripDTO({
            name: train.name,
    
          
           
        });

        return trainTripDTO;
    }
}