import { ObjectID } from "typeorm";

export interface UpdateUser {
    _id:ObjectID;
    newEmail?:string;
    newPassword?: string;

}
