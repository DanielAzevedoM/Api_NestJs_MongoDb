import { IsEmail, IsOptional } from "class-validator";
import { IsUserAlreadyExist } from "src/validators/user/verifyEmailExists.validator";
import { ObjectID } from "typeorm";

//Falta fazer validação de email.
export class UpdateUserDto {

    _id:ObjectID;
    
    @IsUserAlreadyExist({ message: `Email already exists`})
    @IsOptional()
    @IsEmail()
    newEmail: string;
  
    newPassword: string;

}