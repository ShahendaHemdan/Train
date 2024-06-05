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
    arrivalTime1: Date;

    @ManyToOne(() => Station, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    station2: Station;

    @Column({ type: 'time' })
    arrivalTime2: Date;

    @ManyToOne(() => Station, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    station3: Station;

    @Column({ type: 'time' })
    arrivalTime3: Date;

    @ManyToOne(() => Station, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    station4: Station;

    @Column({ type: 'time' })
    arrivalTime4: Date;

    @OneToMany(() => Trip, trip => trip.route)
    trips: Trip[];
}