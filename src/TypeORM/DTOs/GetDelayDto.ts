import { Delay } from "../entities/Delay";

export class GetDelayDto {
    id: number;
    duration: number;
    tripId: number;
    stationId: number;
    stationName:string;
    timestamp: Date;

    constructor(data: GetDelayDto) {
        this.id = data.id ;
        this.duration = data.duration;
        this.tripId = data.tripId;
        this.stationId = data.stationId;
        this.stationName = data.stationName;
        this.timestamp = data.timestamp

    }

    static createFromEntity(delay: Delay): GetDelayDto {
        const delayDTO = new GetDelayDto({
            id: delay.id,
            duration: delay.duration,
            tripId: delay.Trip ? delay.Trip.id : null,
            stationId: delay.Station ? delay.Station.id : null, 
            stationName: delay.Station? delay.Station.name : null,
            timestamp: delay.timestamp ,
        });

        return delayDTO;
    }
}
