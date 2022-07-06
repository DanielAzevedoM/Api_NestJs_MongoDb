import { IsNotEmpty } from "class-validator";

export class PersonDto {
    
  _id?: object;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  gender: string;
  
  @IsNotEmpty()
  birthday: Date;

  selfie: string;

}

