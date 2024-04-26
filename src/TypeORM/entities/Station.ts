import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Delay } from './Delay';
import { IsNotEmpty, IsString } from 'class-validator';


@Entity()
export class Station{

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
  
    @Column()
    @IsNotEmpty()
    @IsString()
    name: string;
  
    // Define the relationship with Delay entity
    @OneToMany(() => Delay, delay => delay.Station, { cascade: true })
    delays: Delay[];
}


