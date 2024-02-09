import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from 'src/TypeORM/DTOs/UserDto';
import { User } from 'src/TypeORM/entities/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(User) private userRepository:Repository<User>){

    }
    async register(userDetails:UserDTO){
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(userDetails.password, saltOrRounds);
        userDetails.password=hash;
        const newUser=this.userRepository.create(userDetails);
        return this.userRepository.save(newUser);
    }
}
