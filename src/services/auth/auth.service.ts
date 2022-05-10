import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User as UserEntity, UserDocument } from '../../models/user/user.entity';
import { User } from 'src/interfaces/user/user.interface';
import { comparePasswords, encondePassword } from 'src/utils/bcrypt';


@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserEntity.name) private userRepository: Model<UserDocument>,
		private jwtService: JwtService
	) { }

	async validateUser(email: string, password: string): Promise<any> {

		try {
			const user = await this.userRepository.findOne({ email });

			try {
				const match = comparePasswords(password, user.password);

				if (match) {
					const { password, ...result } = user;

					return {
						email: result.email,
					};

				}
			} catch {

				throw new HttpException('The password does not match', HttpStatus.NOT_FOUND)
			}
		}
		catch {

			throw new HttpException('User not exists!', HttpStatus.NOT_FOUND)

		}
	}

	async login(user: User): Promise<any> {
		const findUser = await this.userRepository.findOne({email: user.email });
	
		const payload = { email: findUser.email, sub: findUser.id, personId: findUser.personId };

		return {

			access_token: this.jwtService.sign(payload),

		}
	}

	async create(user: User): Promise<UserDocument> {
	
		const password = await encondePassword(user.password)

		return new this.userRepository({ ...user, password }).save();

	}

	async updatePassword(email: string, newPassword: string): Promise<UserDocument> {
		try{
			
			const findUser = await this.userRepository.findOne({ email });

			const password = await encondePassword(newPassword);

			return this.userRepository.findByIdAndUpdate(findUser.id,
				{ password: password },
				{ new: true }).select('-password');

		} 
		catch {

			throw new HttpException('User not found!', HttpStatus.NOT_FOUND)
		}
	}

	async verifyEmailExists(email: string): Promise<UserDocument> {
		const findUser = this.userRepository.findOne({ email });

		return findUser;
	}
}