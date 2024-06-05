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

  @Column({ type: 'time', default: () => 'CURRENT_TIME' })
  timestamp: Date;

  @ManyToOne(() => Trip, trip => trip.delays, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  Trip: Trip;

  @ManyToOne(() => Station, station => station.delays, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'stationId' })
  Station: Station;
  
  @Column() 
  stationName: string; 
}