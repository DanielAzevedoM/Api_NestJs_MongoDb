import { ObjectID } from "typeorm";

export interface Person {
    
    _id: ObjectID;
    name: string
    gender: string;
    birthday: Date;  
  
}
  
  