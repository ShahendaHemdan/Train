export class TrainToDelayDTO {

    id:number;

    name:string;

    constructor(train: TrainToDelayDTO) {
        this.id = train.id;
        this.name = train.name;
    }


    static fromPlainObject(train: { name: string, id:number}): TrainToDelayDTO {
        const traintodelayDTO = new TrainToDelayDTO({
            id:train.id,
            name: train.name,
        });

        return traintodelayDTO;
    }
}