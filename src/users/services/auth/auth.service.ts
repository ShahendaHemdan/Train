import { Body, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from 'src/TypeORM/DTOs/UserDto';
import { User } from 'src/TypeORM/entities/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ServicesService } from '../services.service';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(User) private userRepository:Repository<User>,
                private jwtService: JwtService,
                private userService: ServicesService,
                ){

    }
    async register(userDetails:UserDTO){
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(userDetails.password, saltOrRounds);
        userDetails.password=hash;
        const newUser=this.userRepository.create(userDetails);
        return this.userRepository.save(newUser);
    }

    async Login(@Body('email') email:string,
                @Body('password') password:string,
            ) 
        {

                    const oldUser=await this.userService.findUserByEmail(email);
                    if(oldUser){
                        const compared=await bcrypt.compare(password,oldUser.password);
                        if(compared){
                        const payload = { sub: oldUser.id, email: email };
                        const token=this.jwtService.sign(payload);
                        return { status: HttpStatus.OK, role: oldUser.role, token: token };
                        }
                    }else{
                        return { status: HttpStatus.BAD_REQUEST, msg: 'Wrong Email Or Password' };
                            
                        }
        }
}
