/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn ,OneToMany} from 'typeorm';
import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { TrainType } from '../Enums/TrainType.Enum';
import { TrainClass } from '../Enums/TrainClass.Enum';
import { Trip } from './Trip';
// import { Delay } from './Delay';

@Entity()
export class Train{


    @PrimaryGeneratedColumn({type:'bigint'})
    id: number;


    @Column()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Column()
    @IsNotEmpty()
    @IsNumber()
    capacity: number;



    @Column({
        type: 'enum',
        enum: TrainType,
        default: TrainType.Express, // Set a default role if needed
        })
        
    @IsNotEmpty()
    @IsEnum(TrainType)
        type: TrainType;


        @Column({
            type: 'enum',
            enum: TrainClass,
            default: TrainClass.FirstClass, // Set a default role if needed
            })
            class: TrainClass;
            
            @OneToMany(() => Trip, trip => trip.train, { cascade: true })
            trips: Trip[];
}


