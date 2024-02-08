import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Trip } from './Trip';
// import { User } from './User';
@Entity()
export class Ticket {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;


    @Column()
    price: number;

    @Column()
    availTic: number;

   // Define the relationship with Trip class
  @OneToMany(() => Trip, trip => trip.ticket)
  trips: Trip[];


    // Define the relationship with User Class 

    // @ManyToOne(() => User, user => user.tickets, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    // user: User;

}



