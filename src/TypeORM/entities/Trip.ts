import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany,ManyToOne, OneToOne } from 'typeorm';
import { Train } from './Train';
import { Delay } from './Delay';
import {  IsNotEmpty, IsString } from 'class-validator';
import { Ticket } from './Tickets';
import { UserTicket } from './UserTicket ';
@Entity()
export class Trip {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    name: string;


    @Column()
    @IsNotEmpty()
    arrTime: Date;


    @Column()
    @IsNotEmpty()
    deptTime: Date;

    @Column()
    @IsString()
    @IsNotEmpty()
    origin: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    destination: string;




    @ManyToOne(() => Train, train => train.trips, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn()
    train: Train;
    
    // Define the relationship with Delay entity
    @OneToMany(() => Delay, delay => delay.Trip, { cascade: true })
    delays: Delay[];

     // Define the relationship with Ticket class
    // @ManyToOne(() => Ticket, ticket => ticket.trips)
    // @JoinColumn()
    // ticket: Ticket;

    @OneToOne(() => Ticket, ticket => ticket.trip)
    @JoinColumn()
    ticket: Ticket;

    @OneToMany(() => UserTicket, userTicket => userTicket.trip,{ cascade: true })
    userTickets: UserTicket[];


}





