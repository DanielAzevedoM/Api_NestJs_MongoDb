import { Prop, Schema, SchemaFactory,  } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Exclude } from 'class-transformer';
import { Person } from './person.model';

export type UserDocument = User & Document;

@Schema() 
export class User  {

  @Prop()
  username: string;

  @Prop()
  @Exclude()
  password: string;

  @Prop({default: null, type: mongoose.Schema.Types.ObjectId, ref: 'Person'})
  personId: Person;
 
  @Prop({ default: false })
  isDeleted: boolean;

}


export const UserSchema = SchemaFactory.createForClass(User);