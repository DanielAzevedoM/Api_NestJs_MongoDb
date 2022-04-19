import { Column, Entity, ObjectID, ObjectIdColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Document, ObjectId } from 'mongoose';
import { SchemaFactory, Prop } from '@nestjs/mongoose';
import { Adress } from '../adress/adress.entity';
import { User } from '../user/user.entity';

export type PersonDocument = Person & Document;

@Entity()
export class Person {
  

  @ObjectIdColumn()
  _id: ObjectID;

  @Prop({required: true})
  @Column()
  name: string;

  @Prop({required: true})
  @Column()
  gender: string;

  @Prop({required: true})
  @Column()
  birthday: Date;

  @Prop({nullable: true})
  @Column()
  selfie: string;

  @OneToOne(type => User, person => Person)
  user: User;

  @OneToMany(type => Adress, person => Person)
  adress: Adress;
 
}


export const PersonSchema = SchemaFactory.createForClass(Person);


