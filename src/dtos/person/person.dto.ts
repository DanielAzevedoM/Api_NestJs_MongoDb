import { IsNotEmpty } from "class-validator";

export class CreatePersonDto {
   
  _id: object;
  
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  gender: string;
  
  @IsNotEmpty()
  birthday: Date;

}



