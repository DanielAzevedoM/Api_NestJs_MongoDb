import { IsNotEmpty } from "class-validator";

export class CreateAdressDto {

    _id: object;
   
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
  
  
  
  