import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Trip } from './Trip';
import { User } from './User';
// import { User } from './User';
@Entity()
export class Ticket {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;


    @Column()
    price: number;

    @Column()
    seatNumber: number;

    // Define the relationship with Trip Class 

    @OneToOne(() => Trip, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn()
    Trip: Trip


    // Define the relationship with User Class 

    @ManyToOne(() => User, user => user.tickets, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    user: User;

}



