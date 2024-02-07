// import { RouteDTO } from './RouteDTO'; // Assuming you've already created RouteDTO
import { Station } from '../entities/Station';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { DelayDTO } from './DelayDto2';

export class StationDTO {

    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    

    

    delays: DelayDTO[];



constructor(station: Station) {
    this.id = station.id;
    this.name = station.name;
    this.delays = station.delays ? station.delays.map(delay => DelayDTO.createFromEntity(delay)) : [];
}

// Static method to create StationDTO objects from plain station objects
static fromPlainObject(obj: { name: string, delays?: any, trains?: any }): StationDTO {
    const stationDTO = new StationDTO({
        id: 0, // A temporary value or default value for id
        name: obj.name,
        delays: obj.delays ? obj.delays.map(delay => DelayDTO.createFromEntity(delay)) : [],
    });

    return stationDTO;
}
    

}
