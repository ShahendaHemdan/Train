/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Station } from './Station';
import { Trip } from './Trip';


@Entity()
export class Delay {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;


    @Column()
    duration: number;

    @Column({ default: false })
    processed: boolean;


    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    timestamp: Date;



    // Define the relationship with Trip entity
    @ManyToOne(() => Trip, trip => trip.delays, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn()
    Trip: Trip;

    // Define the relationship with Station entity
    @ManyToOne(() => Station, station => station.delays, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn()
    Station: Station;

}
