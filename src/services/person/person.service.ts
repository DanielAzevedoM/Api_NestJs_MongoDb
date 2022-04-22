import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Person as PersonEntity, PersonDocument } from 'src/models/person/person.entity'; 
import { Person } from 'src/interfaces/person/person.interface';
import { User as UserEntity, UserDocument} from 'src/models/user/user.entity';
import { UpdatePerson } from 'src/interfaces/person/person.update.interface';


@Injectable()
export class PersonService {
    constructor(
		@InjectModel(UserEntity.name) private userRepository: Model<UserDocument>,
		@InjectModel(PersonEntity.name) private personRepository: Model<PersonDocument>,
    ){}

	async create(params, person: Person){
	
		const findUser = await this.userRepository.findById({ _id: params.userId });	

		if(!findUser) return null;

		const result = new this.personRepository(person)

		return result.save();
    }  

    async updateFk(params, person: Person): Promise<UserEntity>{
		const findUser = await this.userRepository.findById({ _id: params.userId });	

		if(!findUser) return null;

		return this.userRepository.findByIdAndUpdate({ _id: findUser._id }, 
            { personId: person._id}, 
            { new: true })
    }

    async remove(params): Promise<PersonEntity>{
		const findUser = await this.userRepository.findById({ _id: params.userId});
	
		if(!findUser) return null;
	
		if(findUser.personId !== null){

			const findPerson = await this.personRepository.findById({ _id: findUser.personId});

			await this.userRepository.findByIdAndUpdate({ _id: findUser.id }, 
				{ personId: null }, 
				{ new: true });

		
			return  this.personRepository.remove({findPerson}).exec()
		}	

		return null;
	}

	async findOne(params): Promise<PersonEntity>{
		const findUser = await this.userRepository.findById({ _id: params.userId});

		const findPerson = await this.personRepository.findOne({ _id: findUser.personId });

		if(!findUser) return null;
		if(!findPerson) return null;
	
		return findPerson;
	}

	async update(params, person: UpdatePerson): Promise<PersonEntity>{
		const findUser = await this.userRepository.findById({ _id: params.userId});

		const findPerson = await this.personRepository.findOne({ _id: findUser.personId });

		if(!findUser) return null;
		if(!findPerson) return null;
	
        
		return  this.personRepository.findByIdAndUpdate({ _id: findPerson._id }, 
			{ 	name: person.newName,
				gender: person.newGender,
				birthday: person.newBirthday
			}, 
			{ new: true });

    }

}


