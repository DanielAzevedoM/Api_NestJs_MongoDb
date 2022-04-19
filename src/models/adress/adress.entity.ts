import mongoose from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Column, Entity, JoinColumn, ManyToOne, ObjectID, ObjectIdColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Person } from '../person/person.entity';



export type AdressDocument = Adress & Document;

@Entity()
export class Adress {
  
  @ObjectIdColumn()
  _id: ObjectID;

  @Prop({required: true})
  @Column()
  adress: string;

  @Prop({required: true})
  @Column()
  city: string;

  @Prop({required: true})
  @Column()
  state: string;

  @Prop({required: true})
  @Column()
  postalCode: number;

  @Prop({required: true})
  @Column()
  country: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Person })
  @Column()
  personId: Object;

}

export const AdressSchema = SchemaFactory.createForClass(Adress);



