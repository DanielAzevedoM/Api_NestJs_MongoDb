import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { IsUserAlreadyExist } from "src/validators/user/verifyEmailExists.validator";


export class CreateUserDto {
      
    @IsEmail({}, { message: 'Invalid email'})
    @IsUserAlreadyExist({ message: `User already exists`})
    email: string

    @Exclude({ toPlainOnly: true })
    @IsNotEmpty({ message: 'Password required'})
    password: string;

}

export class UserDto {

    @IsEmail({}, { message: 'Invalid Email'})
    email:string


    @Exclude({ toPlainOnly: true })
    @IsNotEmpty({ message: 'Password required'})
    password: string


}

export class UpdateUserDto {    
    
    @IsEmail()
    @IsUserAlreadyExist({ message: `Email already exists`})
    @IsOptional()
    email: string;
    
    @IsOptional()
    password?: string;

}



