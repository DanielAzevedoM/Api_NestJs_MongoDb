import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';



export type PersonDocument = Person & Document;

@Schema() 
export class Person {
  
  @Prop()
  name: string;

  @Prop()
  gender: string;

  @Prop()
  birthday: Date;

  @Prop({default: null})
  selfie: string;

}

export const PersonSchema = SchemaFactory.createForClass(Person);


