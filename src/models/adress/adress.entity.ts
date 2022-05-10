import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { Person } from '../person/person.entity';

export type AdressDocument = Adress & Document;

@Schema()
export class Adress {
  
  @Prop()
  adress: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  postalCode: number;

  @Prop()
  country: string;

  @Prop({default: null, type: mongoose.Schema.Types.ObjectId, ref: 'Person'})
  personId: Person;


}

export const AdressSchema = SchemaFactory.createForClass(Adress);


