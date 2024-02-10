import { Body, Controller, HttpStatus,  Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserDTO } from 'src/TypeORM/DTOs/UserDto';
import { AuthService } from 'src/users/services/auth/auth.service';
import { ServicesService } from 'src/users/services/services.service';
import { Response } from 'express';
import { LocalGuard } from 'src/guards/local.guard';

@Controller('auth')
export class AuthController {

    constructor(private userService: ServicesService,
                private authService:AuthService,
        ) {}

    @Post('register')
    @UsePipes(ValidationPipe)
    async Register(@Body() userDto: UserDTO, @Res() res: Response) {

        const oldUser=await this.userService.findUserByEmail(userDto.email);
        // Check If Email Existed
        if(oldUser){
            return res.status(400).json({status:HttpStatus.BAD_REQUEST,msg:'This User Is Already Registered'});

        }else{
            const user =await this.authService.register(userDto);
            if (user) {
                return res.status(201).json({status:HttpStatus.CREATED,msg:' User Registered Sucessfully'});
    
            } else {
                return res.status(404).json({status:HttpStatus.BAD_REQUEST,msg:'User Did Not Registered'});
            }
        }
    
    }


    @Post('login')
    @UseGuards(LocalGuard)
    @UsePipes(ValidationPipe)
    async Login(@Body() body: any) {
        const { email, password } = body;
        return this.authService.Login(email, password);
    }

}

