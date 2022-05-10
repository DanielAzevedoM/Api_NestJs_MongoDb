import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Adress as AdressEntity, AdressDocument } from 'src/models/adress/adress.entity';
import { Person as PersonEntity, PersonDocument } from 'src/models/person/person.entity';
import { CreateAdressDto } from 'src/dtos/adress/adress.dto';
import { UpdateAdressDto } from 'src/dtos/adress/adress.update.dto';

@Injectable()
export class AdressService {
    constructor(
        @InjectModel(PersonEntity.name) private  personRepository: Model<PersonDocument>,
        @InjectModel(AdressEntity.name) private  adressRepository: Model<AdressDocument>
    ){}

    async create(adress: CreateAdressDto): Promise<AdressDocument>{
        try{

          return new this.adressRepository(adress).save();

        } catch {

            throw new HttpException('Unable to create person!', HttpStatus.NOT_FOUND)
            
        }
    }
    
    async updateFk(id: string, adress: CreateAdressDto): Promise<AdressDocument> {   
        try{
            const findPerson = await this.personRepository.findById(id); 

            return  await this.adressRepository.findByIdAndUpdate(adress._id, 
                { personId: findPerson._id }, 
                { new: true });
        } catch {
            throw new HttpException('Unable to update personId!', HttpStatus.NOT_FOUND)
        }
    }

    async findAll(id: string): Promise<AdressDocument[]>{
        try{
            return this.adressRepository.find({ personId: id})
        } catch {
            throw new HttpException('Adresses not found!', HttpStatus.NOT_FOUND)
        }
    }

    async findOne(id: string): Promise<AdressDocument>{
        try{
            return this.adressRepository.findById(id);
        } catch {
            throw new HttpException('Adress not found!', HttpStatus.NOT_FOUND)
        }
    }


    async update(id: string, adress: UpdateAdressDto): Promise<AdressDocument>{
       try{
            return this.adressRepository.findByIdAndUpdate(id , 
                {  ...adress }, 
                { new: true });
       } catch {
            throw new HttpException('Unable to update Adress!', HttpStatus.NOT_FOUND)
       }
        
    }

    async remove(id: string): Promise<PersonDocument>{
        try{
            return this.adressRepository.remove({_id: id}).exec();
        } catch {
            throw new HttpException('Unable to delete Adress!', HttpStatus.NOT_FOUND)
        }
    }


    
}
