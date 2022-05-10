import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Person as PersonEntity, PersonDocument } from 'src/models/person/person.entity'; 
import { User as UserEntity, UserDocument} from 'src/models/user/user.entity';
import { CreatePersonDto, UpdatePersonDto } from 'src/dtos/person/person.dto';
import { Adress as AdressEntity, AdressDocument } from 'src/models/adress/adress.entity';


@Injectable()
export class PersonService {
    constructor(
		@InjectModel(UserEntity.name) private userRepository: Model<UserDocument>,
		@InjectModel(PersonEntity.name) private personRepository: Model<PersonDocument>,
		@InjectModel(AdressEntity.name) private adressRepository: Model<AdressDocument>
    ){}

	async create(person: CreatePersonDto): Promise<PersonDocument> {
		try{
			return await new this.personRepository(person).save();
		} catch {
			throw new HttpException('Unable to create person!', HttpStatus.NOT_FOUND)
		}
	
    }  

	async updateFk(id: string, person: CreatePersonDto): Promise<PersonDocument> {
		try {
			await this.userRepository.findByIdAndUpdate(id,
				{ personId: person._id },
				{ new: true })

			return this.personRepository.findById(person._id);
		}
		catch {
			throw new HttpException('Unable to updateFk personId!', HttpStatus.NOT_FOUND)
		}
	}

	async remove(id: string): Promise<PersonDocument> {
		try {

			const checkPersonExists = await this.userRepository.findOne({ personId: id })

			if (!checkPersonExists) return null;

			if (checkPersonExists.personId !== null) {

				await this.userRepository.findByIdAndUpdate(checkPersonExists.id,
					{ personId: null },
					{ new: true });


				return this.personRepository.remove({ _id: id }).exec()

			}
		} catch {

			throw new HttpException('Unable to delete person!', HttpStatus.NOT_FOUND)

		}
	}

	async findOne(id: string): Promise<PersonDocument>{
		 try{
			return this.personRepository.findById(id);
		 } catch {
			throw new HttpException('Person not found!', HttpStatus.NOT_FOUND)
		 }
	
	}

	async findByCityOrState(location:{ city: string, state: string}): Promise<PersonDocument>{
        try{
			return this.adressRepository.findOne({location})
        } catch {
			throw new HttpException('Person not found!', HttpStatus.NOT_FOUND)
        }
    }

	async update(id: string, person: UpdatePersonDto): Promise<PersonDocument>{
		
		return  this.personRepository.findByIdAndUpdate( id , 
			{ ...person }, 
			{ new: true });

    }

	async updateSelfie(id: string , selfie: string): Promise<PersonDocument>{
		try{
			return  this.personRepository.findByIdAndUpdate( id, 
				{ 	
					selfie: selfie
				}, 
				{ new: true });

		} catch {
			
			throw new HttpException('Unable to add selfie!', HttpStatus.NOT_FOUND)
		}
		
	}

}


