import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany,ManyToOne } from 'typeorm';
import { Train } from './Train';
import { Delay } from './Delay';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Ticket } from './Tickets';
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
    @IsDate()
    arrTime: Date;


    @Column()
    @IsNotEmpty()
    @IsDate()
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
    @ManyToOne(() => Ticket, ticket => ticket.trips)
    @JoinColumn()
    ticket: Ticket;


}





