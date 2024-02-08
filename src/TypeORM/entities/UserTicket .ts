import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Ticket } from "./Tickets";
import { User } from "./User";

@Entity('user_ticket')
export class UserTicket {
    @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  seatNumber: number;

  @ManyToOne(() => User, user => user.userTickets,{ onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Ticket, ticket => ticket.userTickets,{ onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'ticketId' })
  ticket: Ticket;
}