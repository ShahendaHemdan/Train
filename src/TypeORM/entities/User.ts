import { Entity, Column, PrimaryGeneratedColumn, } from 'typeorm';
import { UserRole } from '../Enums/UserRole.Enum';
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

    
    // /// Establishing one-to-many relationship with Ticket entity
    // @OneToMany(() => Ticket, ticket => ticket.user, { cascade: true })
    // tickets: Ticket[];

}