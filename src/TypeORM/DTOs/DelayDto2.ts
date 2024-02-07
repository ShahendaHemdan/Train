import { Delay } from "../entities/Delay";

export class DelayDTO {
    id: number;
    duration: number;
    tripId: number;
    stationId: number;
    timestamp: Date;

    constructor(data: DelayDTO) {
        this.id = data.id ;
        this.duration = data.duration;
        this.tripId = data.tripId;
        this.stationId = data.stationId;
        this.timestamp = data.timestamp

    }

    static createFromEntity(delay: Delay): DelayDTO {
        const delayDTO = new DelayDTO({
            id: delay.id,
            duration: delay.duration,
            tripId: delay.Trip ? delay.Trip.id : null,
            stationId: delay.Station ? delay.Station.id : null, 
            timestamp: delay.timestamp ,
        });

        return delayDTO;
    }
}
