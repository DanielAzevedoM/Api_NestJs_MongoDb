import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import mongoose from 'mongoose';
import { Person } from '../person/person.entity';
import { BeforeInsert } from 'typeorm';
import { v4 } from 'uuid';


export type UserDocument = User & Document;

@Schema() 
export class User  {

  @Prop()
  email: string

  @Prop()
  password: string;
 
  @Prop({default: null, type: mongoose.Schema.Types.ObjectId, ref: 'Person'})
  personId: Person;

  @Prop({ default: false })
  isDeleted: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);