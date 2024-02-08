import { Entity, Column, PrimaryGeneratedColumn, OneToMany, } from 'typeorm';
import { UserRole } from '../Enums/UserRole.Enum';
import { UserTicket } from './UserTicket ';
@Entity()
export class User{
    @PrimaryGeneratedColumn({type:'bigint'})
    id: number;

    @Column()
    fName: string;

    @Column()
    lName: string;

    @Column()
    email: string;

    @Column()
    password: string;

  
    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.CLIENT, // Set a default role if needed
        })
        role: UserRole;

    
     /// Establishing one-to-many relationship with Ticket entity
    @OneToMany(() => UserTicket, userTicket => userTicket.user)
    userTickets: UserTicket[];

}