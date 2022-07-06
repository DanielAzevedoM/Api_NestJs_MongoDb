import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/interfaces/user.interface";
import { User as UserModel, UserDocument } from "src/models/user.model";
import { encondePassword } from "src/utils/bcrypt";


@Injectable()
export class UserService {

	constructor(
		@InjectModel(UserModel.name) private userRepository: Model<UserDocument>,
		
	) { }

    async findOne(id: string): Promise<UserDocument>{
		const result = await this.userRepository.findById(id).select('-password')

		if(!result) throw new HttpException(`Could not find user`, HttpStatus.NOT_FOUND)

        return result;
    }

	async findAll(): Promise<UserDocument[]>{
		return this.userRepository.find({ isDeleted: false }, { password: 0, isDeleted: 0 })
	}

    async update(id: string, user: User): Promise<UserDocument>{
		const checkUsernameExists = await this.userRepository.findOne({ username: user.username})

		if (checkUsernameExists) throw new HttpException(`Username already exist.`, HttpStatus.BAD_REQUEST);

		if(user.password){
			const encodePassword = await encondePassword(user.password);

			const result = await this.userRepository.findByIdAndUpdate(id, {...user, password: encodePassword}, { new: true}).select('-password');

			if (result) throw new HttpException(`Could not update user`, HttpStatus.BAD_REQUEST);

			return result;
		}	

		const result = await this.userRepository.findByIdAndUpdate(id, {...user}, { new: true }).select('-password');

		if (result) throw new HttpException(`Could not update user`, HttpStatus.BAD_REQUEST);

		return result;
	}

	async delete(id: string): Promise<UserDocument>{
		const result = await this.userRepository.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).select('-password')

		if(!result) throw new HttpException(`Can not delete user.`, HttpStatus.BAD_REQUEST)

		return result;
	}

}