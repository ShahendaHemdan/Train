import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/TypeORM/DTOs/UserDto';
import { User } from '../../TypeORM/entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class ServicesService {
    
    constructor(@InjectRepository(User) private userRepository:Repository<User>){

    }
    findAllUsers(){
        return this.userRepository.find();
    }


    findUserById(id:number){
        return this.userRepository.findBy({id});
    }

    findUserByEmail(email:string){
        const user =  this.userRepository.findOne({ where: { email } });
        return user;

    }

    async createUser(userDetails:UserDTO){
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(userDetails.password, saltOrRounds);
        userDetails.password=hash;
        const newUser=this.userRepository.create(userDetails);
        return this.userRepository.save(newUser);
    }

    async updateUser(id:number,updateUserDto:UserDTO){
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(updateUserDto.password, saltOrRounds);
        updateUserDto.password=hash;
        return this.userRepository.update({ id },{ ...updateUserDto})
    }

    deleteUser(id:number){
        return this.userRepository.delete({id});
    }
}
