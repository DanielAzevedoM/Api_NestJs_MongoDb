import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User as UserEntity, UserDocument} from '../../models/user/user.entity';
import { UpdateUserDto } from 'src/dtos/user/user.dto';
import { encondePassword } from 'src/utils/bcrypt';


@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserEntity.name) private  userRepository: Model<UserDocument>,
    ){}
 
    async findAll(): Promise<UserDocument[]> { 
        try{
       return this.userRepository.find().select('-password');
        } catch {
            throw new HttpException('Users not found!', HttpStatus.NOT_FOUND)
        }
    }

    async findOne(id: string): Promise<UserDocument>{
        try{
            const findUser = await this.userRepository.findById(id).select('-password')

            return findUser;

        } catch {

            throw new HttpException('User not found!', HttpStatus.NOT_FOUND)

        }
    }

    async update(id: string, user: UpdateUserDto): Promise<UserDocument>{
          try{
                if(user.password){
                    const decodedPassword = await encondePassword(user.password);

                    return this.userRepository.findByIdAndUpdate( id, 
                        { ...user, password: decodedPassword  }, 
                        { new: true }).select('-password');
                }

                return this.userRepository.findByIdAndUpdate( id, 
                    { ...user }, 
                    { new: true }).select('-password');
            
        } catch {

            throw new HttpException('Unable to change user!', HttpStatus.NOT_FOUND)

        }
    
    }

    async remove(id: string): Promise<UserDocument>{
       try{
        return this.userRepository.findByIdAndUpdate( id, 
            { isDeleted: true }, 
            { new: true }).select('-password');;

       } catch {

            throw new HttpException('Unable to delete user!', HttpStatus.NOT_FOUND)
       }
        
    }

}
