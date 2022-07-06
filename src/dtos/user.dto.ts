import { Exclude } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class UserDto {
    
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @Exclude({ toPlainOnly: true })
    password: string;

}


