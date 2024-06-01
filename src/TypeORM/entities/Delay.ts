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

  @ManyToOne(() => Trip, trip => trip.delays, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  Trip: Trip;

  @ManyToOne(() => Station, station => station.delays, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'stationId' }) // Add this line
  Station: Station; // Rename to uppercase 'Station'
  
  @Column() // Add this line
  stationName: string; // Add this line
}