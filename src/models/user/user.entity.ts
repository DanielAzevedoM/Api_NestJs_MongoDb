import { Column, Entity, JoinColumn, ObjectID, ObjectIdColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Document, ObjectId } from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Person } from '../person/person.entity';
import mongoose from 'mongoose';

export type UserDocument = User & Document;

@Entity() 
export class User  {
  
  @ObjectIdColumn()
  _id: ObjectID;

  @Prop({required: true})
  @Column()
  email: string

  @Prop({required: true})
  @Column()
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Person })
  @Column()
  personId: Object;
}

export const UserSchema = SchemaFactory.createForClass(User);

