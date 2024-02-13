import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Trip } from './Trip';
import { UserTicket } from './UserTicket ';
import { IsNotEmpty, IsNumber } from 'class-validator';
@Entity()
export class Ticket {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @IsNotEmpty()
    @IsNumber()
    @Column()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    @Column()
    availTic: number;

   // Define the relationship with Trip class
  @OneToMany(() => Trip, trip => trip.ticket)
  trips: Trip[];


    // Define the relationship with User Class 

    @OneToMany(() => UserTicket, userTicket => userTicket.ticket)
  userTickets: UserTicket[];

}



