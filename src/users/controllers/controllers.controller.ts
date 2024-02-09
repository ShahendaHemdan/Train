import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { ServicesService } from '../services/services.service';
import { UserDTO } from 'src/TypeORM/DTOs/UserDto';
import { Response } from 'express';

@Controller('users')
export class ControllersController {

    constructor(private userService: ServicesService) { }
    @Get()
    async getAllUsers(@Res() res:Response) {
        const users = await this.userService.findAllUsers();

        const usersDTO: UserDTO[] = users.map(user => UserDTO.fromUser(user));
        if (usersDTO.length > 0) {

            return res.status(200).json({status:HttpStatus.OK,data:usersDTO});
        
        } else {

            return res.status(404).json({status:HttpStatus.NOT_FOUND,msg:'There are no users'});
        }
    }


    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number,@Res() res:Response) {
        const user = await this.userService.findUserById(id);
        const usersDTO: UserDTO[] = user.map(user => UserDTO.fromUser(user));
        if (usersDTO.length > 0) {
            return res.status(200).json({status:HttpStatus.OK,data:usersDTO});
        } else {
            return res.status(404).json({status:HttpStatus.NOT_FOUND,msg:'There is no such user'});
        }

    }

    @Post()
    @UsePipes(ValidationPipe)
    async addUser(@Body() userDto: UserDTO, @Res() res: Response) {

        const oldUser=await this.userService.findUserByEmail(userDto.email);
        // Check If Email Existed
        if(oldUser){
            return res.status(400).json({status:HttpStatus.BAD_REQUEST,msg:'This User Is Already Registered'});

        }else{
            const user = this.userService.createUser(userDto);
            if (user) {
                return res.status(201).json({status:HttpStatus.CREATED,data:user});
    
            } else {
                return res.status(404).json({status:HttpStatus.BAD_REQUEST,msg:'User Did Not Saved'});
            }
        }
    
    }

    @Patch(':id')
    @UsePipes(ValidationPipe)
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() userDto: UserDTO, @Res() res: Response) {
        const user = await this.userService.findUserById(id);
        if (user[0]) {
            const updatedUser = await this.userService.updateUser(id, userDto);
            if (updatedUser.affected) {
                return res.status(201).json({status:HttpStatus.CREATED,msg:'User Updated Succesfully'});
            } else {
                return res.status(404).json({status:HttpStatus.BAD_REQUEST,msg:'User Did Not Updated'});
            }
        } else {
            return res.status(404).json({status:HttpStatus.NOT_FOUND,msg:'There are no users'});
        }

    }

    @Delete(':id')
    async deletUser(@Param('id', ParseIntPipe) id: number,@Res() res:Response) {
        const deletedUser = await this.userService.deleteUser(id);
        if (deletedUser.affected) {
            return res.status(200).json({status:HttpStatus.OK,msg:'User Deleted Sucessfully'});
        } else {
            return res.status(404).json({status:HttpStatus.NOT_FOUND,msg:'There are no users'});
        }
    }
}
