import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Adress as AdressEntity } from 'src/models/adress/adress.entity';
import { User as UserEntity } from 'src/models/user/user.entity';
import { Person as PersonEntity } from 'src/models/person/person.entity';
import { Adress } from 'src/interfaces/adress/adress.interface';
import { UpdateAdress } from 'src/interfaces/adress/adress.update.interface';



@Injectable()
export class AdressService {
    constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PersonEntity) private readonly personRepository: Repository<PersonEntity>,
    @InjectRepository(AdressEntity) private readonly adressRepository: Repository<AdressEntity>
    ){}

    async create(params, adress: Adress): Promise<AdressEntity>{
        const findPerson = await this.personRepository.findOne(params.personId)

		if(!findPerson) return null;

        return this.adressRepository.save(adress);
    }
    
    async updateFk(params, adress: Adress): Promise<AdressEntity> {   
        const findPerson = await this.personRepository.findOne(params.personId)

        const updateFk = {
            ...adress,
            personId: findPerson._id

        }

        return this.adressRepository.save(updateFk)
    }

    async findAll(params): Promise<AdressEntity[]>{ 
        const findPerson = await this.personRepository.findOne(params.personId)

        const findAdress = await this.adressRepository.find({personId: findPerson._id})
  
		if(!findPerson) return null;

        return findAdress;
    }

    async findOne(params): Promise<AdressEntity>{
        const findPerson = await this.personRepository.findOne(params.personId)

        const findAdress = await this.adressRepository.findOne(params.id)

     
		if(!findPerson) return null;
        if(!findAdress) return null;

        return findAdress;
    }

    async update(params, adress: UpdateAdress): Promise<AdressEntity>{
        const findPerson = await this.personRepository.findOne(params.personId);

        const findAdress = await this.adressRepository.findOne(params.id);
     
		if(!findPerson) return null;
        if(!findAdress) return null;
   
        const adressUpdate = {
            ...findAdress,
            adress: adress.newAdress,
            city: adress.newCity,
            state: adress.newState,
            postalCode: adress.newPostalCode,
            country: adress.newCountry,
        }

         return this.adressRepository.save(adressUpdate);    
    }


    async remove(params): Promise<AdressEntity>{
        const findPerson = await this.personRepository.findOne(params.personId);

        const findAdress = await this.adressRepository.findOne(params.id);

		if(!findPerson) return null;
        if(!findAdress) return null;
       
        
        return this.adressRepository.remove(findAdress);
    }


    
}
