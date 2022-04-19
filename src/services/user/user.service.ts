import { Injectable, Res } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User as UserEntity} from '../../models/user/user.entity';
import { User } from '../../interfaces/user/user.interface';
import { UpdateUser } from 'src/interfaces/user/user.update.interface'
import { InjectRepository } from '@nestjs/typeorm';




@Injectable()
export class UserService {
    constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,

      ){}

    create(user: User): Promise<UserEntity>{
        return this.userRepository.save(user);
    }
    
    findAll(): Promise<UserEntity[]> {     
        return this.userRepository.find();
    }

    async findOne(id: string): Promise<UserEntity>{
        const findUser = await this.userRepository.findOne(id);

        if(!findUser) return null;

        return findUser;
    }

    async update(id: string, user:  UpdateUser): Promise<UserEntity>{

        console.log(id)
        const findUser = await this.userRepository.findOne(id)

        if(!findUser) return null

        const userUpdate = {
            ...findUser,
            email: user.newEmail,
            password: user.newPassword
        }

         return this.userRepository.save(userUpdate);    
    }


    async remove(id: string): Promise<UserEntity>{
        const findUser = await this.userRepository.findOne(id);

        if(!findUser) return null;

        return this.userRepository.remove(findUser);
    }

    async verifyEmailExists(email: string): Promise<UserEntity>{
        const findUser = await this.userRepository.findOne({ where: { email}}) ;

        return findUser;
    }

}
