import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PersonDto } from "src/dtos/person.dto";
import { Person } from "src/interfaces/person.interface";
import { Adress as AdressModel, AdressDocument } from "src/models/adress.model";
import { Person as PersonModel, PersonDocument} from "src/models/person.model";
import { User as UserModel, UserDocument } from "src/models/user.model";

@Injectable()
export class PersonService {

	constructor(
		@InjectModel(PersonModel.name) private personRepository: Model<PersonDocument>,
        @InjectModel(UserModel.name) private userRepository: Model<UserDocument>,
        @InjectModel(AdressModel.name) private adressRepository: Model<AdressDocument>
	
	) { }

    async create(person: PersonDto): Promise<PersonDocument> {
        const result = await new this.personRepository(person).save();

        if(!result) throw new HttpException(`Could not create person`, HttpStatus.BAD_REQUEST);

        return result;
    }

    async updateFk(id: string, person: PersonDto): Promise<UserDocument>{
        const result = await this.userRepository.findByIdAndUpdate(id, { personId: person._id}, { new: true }).select('-password');

        if(!result) throw new HttpException(`Could not updateFK person`, HttpStatus.BAD_REQUEST);

        return result;
    }

    async delete(id: string): Promise<PersonDocument> {
        const findUser = await this.userRepository.findOne({ personId: id});

        if(findUser){ await this.userRepository.findByIdAndUpdate(findUser.id, { personId: null}, { new: true })};
        
        const result = await this.personRepository.remove({ _id: id });

        if(!result) throw new HttpException(`Could not delete user`, HttpStatus.BAD_REQUEST);

        return result;
    }

    async findOne(id: string): Promise<PersonDocument>{
        const result = await this.personRepository.findById(id);

        if(!result) throw new HttpException(`Could not find user`, HttpStatus.BAD_REQUEST)

        return result;
    }

    async findByLocation(id: string, location: { city: string, state: string}): Promise<AdressDocument[]>{
        const result = await this.adressRepository.find({ personId: id, location });

        if(!result) throw new HttpException(`Could not find person`, HttpStatus.BAD_REQUEST)

        return result;
    }

    async update(id: string, person: Person): Promise<PersonDocument>{
        const result = await this.personRepository.findByIdAndUpdate(id, { ...person }, { new: true });

        if(!result) throw new HttpException(`Could not update person`, HttpStatus.BAD_REQUEST)
        
        return result;
    }

    async upload(id: string, file: string): Promise<PersonDocument>{
        const result = await this.personRepository.findByIdAndUpdate(id, { selfie: file}, { new: true }).select({ _id: 0, selfie: 1})

        if(!result) throw new HttpException(`Could not upload photo person`, HttpStatus.BAD_REQUEST)

        return result;
    }


}