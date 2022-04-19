import { IsNotEmpty } from "class-validator";
import { ObjectID } from "typeorm";

export class CreateAdressDto {
   
    _id: ObjectID;

    @IsNotEmpty()
    adress: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    state: string;

    @IsNotEmpty()
    postalCode: number;
    
    @IsNotEmpty()
    country: string;
  
  }
  
  
  
  