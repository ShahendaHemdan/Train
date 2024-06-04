import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Ticket } from "./Tickets";
import { User } from "./User";
import { Trip } from "./Trip";

@Entity('user_ticket')
export class UserTicket {
    @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  seatNumber: number;

  @Column({ type: 'time', default: () => 'CURRENT_TIME' })
  time: Date;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  date: Date;


  @ManyToOne(() => User, user => user.userTickets,{ onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Ticket, ticket => ticket.userTickets,{ onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'ticketId' })
  ticket: Ticket;

  @ManyToOne(() => Trip, trip => trip.userTickets,{ onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'tripId' })
  trip: Trip;
}