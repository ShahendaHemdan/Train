/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, IsString, IsEnum,  } from 'class-validator';
import { UserRole } from '../Enums/UserRole.Enum';

export class UserDTO {

    id: number;

    @IsNotEmpty()
    @IsString()
    fName: string;

    @IsNotEmpty()
    @IsString()
    lName: string;

    @IsNotEmpty()
    @IsEmail()

    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole;


      // Static method to create UserDTO objects from plain user objects
       static fromUser(user: any): UserDTO {
        const userDto = new UserDTO();
        userDto.id=user.id;
        userDto.fName = user.fName;
        userDto.lName = user.lName;
        userDto.email = user.email;
        userDto.role = user.role;
        return userDto;
    }
}