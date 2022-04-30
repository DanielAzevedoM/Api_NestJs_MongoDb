import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User as UserEntity, UserDocument} from '../../models/user/user.entity';
import { User } from '../../interfaces/user/user.interface';
import { UpdateUser } from 'src/interfaces/user/user.update.interface'


@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserEntity.name) private userRepository: Model<UserDocument>,
    ){}

    create(user: User){
        const result = new this.userRepository(user);
        
        return  result.save();
    }
    
   async findAll() {  
       return this.userRepository.find()
    }

    async findOne(id: string){
        const findUser = await this.userRepository.findById({ _id: id});
        
        if(!findUser) return null;

        return findUser;
    }

    async update(id: string, user:  UpdateUser){
        const findUser = await this.userRepository.findById({ _id: id});

        if(!findUser) return null;
    
        return this.userRepository.findByIdAndUpdate({ _id: id }, 
            { email: user.newEmail, password: user.newPassword }, 
            { new: true });
    }


    async remove(id: string){
        const findUser = await this.userRepository.findById(id);

        if(!findUser) return null;
    
        return this.userRepository.findByIdAndUpdate({ _id: id }, 
            { isDeleted: true }, 
            { new: true });
    }

    async verifyEmailExists(email: string){
        const findUser = await this.userRepository.findOne({email: email});

        return findUser;
    }

    async findOneGuard(email: string){
 
        const findUser = await this.userRepository.findOne({email: email});

        return findUser;
    }

}
