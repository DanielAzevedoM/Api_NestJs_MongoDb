import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from '@nestjs/jwt';
import { Model } from "mongoose";
import { UserDto } from "src/dtos/user.dto";
import { User as UserModel, UserDocument } from "src/models/user.model";
import { comparePasswords, encondePassword } from "src/utils/bcrypt";


@Injectable()
export class AuthService {

	constructor(
		@InjectModel(UserModel.name) private userRepository: Model<UserDocument>,
		private jwtService: JwtService
	) { }

	async validateUser(username: string, password: string): Promise<any> {

		const userValidation = await this.userRepository.findOne({ username });

		if (!userValidation) throw new HttpException(`User does not exist.`, HttpStatus.NOT_FOUND);

		const match = comparePasswords(password, userValidation.password);

		if (match) {
			const { password, ...result } = userValidation;

			return {
				username: result.username,
			}
		} else {
			throw new HttpException(`Wrong password`, HttpStatus.BAD_REQUEST);
		}
	}

	async register(user: UserDto): Promise<UserDocument> {

		const checkUserExists = await this.userRepository.findOne({ username: user.username });

		if (checkUserExists) throw new HttpException(`User already exists.`, HttpStatus.BAD_REQUEST);

		const encodedPassword = await encondePassword(user.password);

		const result = new this.userRepository({ ...user, password: encodedPassword }).save();

		if (!result) throw new HttpException(`Could not create new user`, HttpStatus.BAD_REQUEST);

		throw new HttpException(`Registered successfully`, HttpStatus.OK);
	}

	async login(user: UserDto): Promise<any> {

		const checkUserExists = await this.userRepository.findOne({ username: user.username });

		if (!checkUserExists) throw new HttpException(`User does not exist.`, HttpStatus.NOT_FOUND);

		const payload = { username: checkUserExists.username, sub: checkUserExists.id, personId: checkUserExists.personId };

		return {

			access_token: this.jwtService.sign(payload),
		}
	}

	async update(id: string, password: string): Promise<UserDocument>{

		const encodePassword = await encondePassword(password);

		const result = await this.userRepository.findByIdAndUpdate(id, { password: encodePassword}, { new: true}).select('-password');

		if(!result) throw new HttpException(`Could not update password`, HttpStatus.BAD_REQUEST)
	
		return result;
	}	
}