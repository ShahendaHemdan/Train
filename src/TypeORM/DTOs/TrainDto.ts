import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { TrainType } from '../Enums/TrainType.Enum';
import { TrainClass } from '../Enums/TrainClass.Enum';



export class TrainDTO {
    @IsNotEmpty()
    @IsNumber()
    id:number

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    capacity: number;


    @IsNotEmpty()
    @IsEnum(TrainType)
    type: TrainType;

    @IsNotEmpty()
    @IsEnum(TrainClass)
    class: TrainClass;



    constructor(train: TrainDTO) {
        this.id = train.id;
        this.name = train.name;
        this.capacity = train.capacity;
        this.type = train.type;
        this.class = train.class;

    }


    // Static method to create StationDTO objects from plain station objects
    static fromPlainObject(train: { id: number; name: string; capacity: number; type: TrainType; class: TrainClass }): TrainDTO {
        const trainDTO = new TrainDTO({
            id: train.id,
            name: train.name,
            capacity: train.capacity,
            type: train.type,
            class: train.class,
        });

        return trainDTO;
    }
}

