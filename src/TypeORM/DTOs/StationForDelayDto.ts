// import { RouteDTO } from './RouteDTO'; // Assuming you've already created RouteDTO
import { IsNotEmpty, IsString } from 'class-validator';

export class StationForDelayDto {


    @IsNotEmpty()
    @IsString()
    name: string;



constructor(station: StationForDelayDto) {
    this.name = station.name;
}

// Static method to create StationDTO objects from plain station objects
static fromPlainObject(obj: { name: string}): StationForDelayDto {
    const stationDTO = new StationForDelayDto({
        name: obj.name,
    });

    return stationDTO;
}
    

}
