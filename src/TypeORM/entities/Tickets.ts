/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne } from 'typeorm';
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

  @OneToOne(() => Trip, trip => trip.ticket, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  trip: Trip;
    // Define the relationship with User Class 

    @OneToMany(() => UserTicket, userTicket => userTicket.ticket,{ cascade: true })
  userTickets: UserTicket[];

}



