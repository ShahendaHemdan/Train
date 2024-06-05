import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Station } from './Station';
import { Trip } from './Trip';

@Entity()
export class Route {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @ManyToOne(() => Station, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    station1: Station;

    @Column({ type: 'time' })
    arrivalTime1: string;

    @Column({ default: false })
    arrived1: boolean;


    @ManyToOne(() => Station, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    station2: Station;

    @Column({ type: 'time' })
    arrivalTime2: string;

    @Column({ default: false })
    arrived2: boolean;
    @ManyToOne(() => Station, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    station3: Station;

    @Column({ type: 'time' })
    arrivalTime3: string;

    @Column({ default: false })
    arrived3: boolean;


    @ManyToOne(() => Station, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    station4: Station;

    @Column({ type: 'time' })
    arrivalTime4: string;

    @Column({ default: false })
    arrived4: boolean;

    @OneToMany(() => Trip, trip => trip.route)
    trips: Trip[];
}