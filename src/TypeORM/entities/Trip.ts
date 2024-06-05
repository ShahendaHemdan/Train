import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany, ManyToOne, OneToOne } from 'typeorm';
import { Train } from './Train';
import { Delay } from './Delay';
import { IsNotEmpty, IsString } from 'class-validator';
import { Ticket } from './Tickets';
import { UserTicket } from './UserTicket ';
import { Route } from './Route';

@Entity()
export class Trip {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Column({ type: 'time' })
    @IsNotEmpty()
    arrTime: Date;

    @Column({ type: 'time' })
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

    @Column({ type: 'date' })
    date: Date;

    @ManyToOne(() => Train, train => train.trips, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn()
    train: Train;

    @OneToMany(() => Delay, delay => delay.Trip, { cascade: true })
    delays: Delay[];

    @OneToOne(() => Ticket, ticket => ticket.trip)
    @JoinColumn()
    ticket: Ticket;

    @OneToMany(() => UserTicket, userTicket => userTicket.trip, { cascade: true })
    userTickets: UserTicket[];

    @ManyToOne(() => Route, route => route.trips,{cascade:true})
    route: Route;
}