import { Body, Controller, HttpStatus, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserDTO } from 'src/TypeORM/DTOs/UserDto';
import { AuthService } from 'src/users/services/auth/auth.service';
import { ServicesService } from 'src/users/services/services.service';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {

    constructor(private userService: ServicesService,
                private authService:AuthService,
                private jwtService: JwtService
        ) {}

    @Post('register')
    @UsePipes(ValidationPipe)
    async Register(@Body() userDto: UserDTO, @Res() res: Response) {

        const oldUser=await this.userService.findUserByEmail(userDto.email);
        // Check If Email Existed
        if(oldUser){
            return res.status(400).json({status:HttpStatus.BAD_REQUEST,msg:'This User Is Already Registered'});

        }else{
            const user = this.authService.register(userDto);
            if (user) {
                return res.status(201).json({status:HttpStatus.CREATED,msg:' User Registered Sucessfully'});
    
            } else {
                return res.status(404).json({status:HttpStatus.BAD_REQUEST,msg:'User Did Not Registered'});
            }
        }
    
    }


    @Post('login')
    @UsePipes(ValidationPipe)
    async Login(@Body('email') email:string,
                @Body('password') password:string,
                @Res() res: Response) 
        {

                    const oldUser=await this.userService.findUserByEmail(email);
                    const compared=await bcrypt.compare(password,oldUser.password);
                    if(oldUser && compared){
                        const payload = { sub: oldUser.id, email: email };
                        const token=this.jwtService.sign(payload);
                        return res.status(200).json({status:HttpStatus.OK,role:oldUser.role,token:token});
                    }else{
                            return res.status(400).json({status:HttpStatus.BAD_REQUEST,msg:"Wrong Email Or Password"});
                            
                        }
        }

}

