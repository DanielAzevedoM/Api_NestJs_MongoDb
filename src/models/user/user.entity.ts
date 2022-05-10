import { Prop, Schema, SchemaFactory,  } from '@nestjs/mongoose';
import { Document, Types, ObjectId } from 'mongoose';
import mongoose from 'mongoose';
import { Person } from '../person/person.entity';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';


export type UserDocument = User & Document;

@Schema() 
export class User  {

  @Prop()
  email: string;

  @Prop()
  @ExcludeProperty()
  password: string;
 
  @Prop({default: null, type: mongoose.Schema.Types.ObjectId, ref: 'Person'})
  personId: Person;

  @Prop({ default: false })
  isDeleted: boolean;

}


export const UserSchema = SchemaFactory.createForClass(User);