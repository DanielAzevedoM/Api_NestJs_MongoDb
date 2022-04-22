import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Adress as AdressEntity } from 'src/models/adress/adress.entity';
import { Person as PersonEntity } from 'src/models/person/person.entity';
import { Adress } from 'src/interfaces/adress/adress.interface';
import { UpdateAdress } from 'src/interfaces/adress/adress.update.interface';

@Injectable()
export class AdressService {
    constructor(
        @InjectModel(PersonEntity.name) private  personRepository: Model<PersonEntity>,
        @InjectModel(AdressEntity.name) private  adressRepository: Model<AdressEntity>
    ){}

    async create(params, adress: Adress){
        const findPerson = await this.personRepository.findById({ _id: params.personId })

		if(!findPerson) return null;

        const result = new this.adressRepository(adress);

        return result.save();
    }
    
    async updateFk(params, adress: Adress) {   
        const findPerson = await this.personRepository.findById({ _id: params.personId}); 

        const findAdress = await this.adressRepository.findById({ _id: adress._id });

        if(!findPerson) return null;
        if(!findAdress) return null;

        return  await this.adressRepository.findByIdAndUpdate({ _id: findAdress._id }, 
            { personId: findPerson._id }, 
            { new: true });
    }

    async findAll(params){
        const findPerson = await this.personRepository.findById({ _id: params.personId})

        const findAdress = await this.adressRepository.find({ personId: findPerson._id })
  
		if(!findPerson) return null;

        return findAdress;
    }

    async findOne(params){
        const findPerson = await this.personRepository.findById({ _id: params.personId});

        const findAdress = await this.adressRepository.findOne({ _id: params.id });

		if(!findPerson) return null;
        if(!findAdress) return null;

        return findAdress;
    }

    async update(params, adress: UpdateAdress){
       const findPerson = await this.personRepository.findById({ _id: params.personId});

        const findAdress = await this.adressRepository.findOne({ _id: params.id });
     
		if(!findPerson) return null;
        if(!findAdress) return null;
        
        return  await this.adressRepository.findByIdAndUpdate({ _id: findAdress._id }, 
            {   
                adress: adress.newAdress,
                city: adress.newCity,
                state: adress.newState,
                postalCode: adress.newPostalCode,
                country: adress.newCountry    
            }, 
            { new: true });
        
    }

    async remove(params){
        const findPerson = await this.personRepository.findById({ _id: params.personId});

        const findAdress = await this.adressRepository.findById({ _id: params.id});

		if(!findPerson) return null;
        if(!findAdress) return null;
       
        return this.adressRepository.remove({_id: findAdress._id}).exec();
    }


    
}
