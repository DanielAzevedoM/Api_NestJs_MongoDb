import { ObjectID } from "typeorm";

export class CreatePersonDto {
   
  _id: ObjectID;
  name: string
  gender: string;
  birthday: Date;

}



