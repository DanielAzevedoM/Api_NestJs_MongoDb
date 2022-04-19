import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";
import { IsUserAlreadyExist } from "src/validators/user/verifyEmailExists.validator";
import { ObjectID } from "typeorm";

export class CreateUserDto {
    
    _id: ObjectID;
   
    @IsEmail({}, { message: 'Invalid email'})
    @IsUserAlreadyExist({ message: `Email already exists`})
    email: string

    //@Exclude({ toPlainOnly: true })
    @IsNotEmpty({ message: 'Password required'})
    password: string;
    

    

    
}



