import { ObjectID } from "typeorm";

export interface Adress {
   
    _id: ObjectID;
    adress: string;
    city: string;
    state: string;
    postalCode: number;
    country: string;
  
  }
  
  
  
  