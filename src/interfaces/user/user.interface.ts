import { ObjectID } from 'typeorm';

export interface User { 
    
    _id: ObjectID;
    email:string;
    password: string;   
   
}


