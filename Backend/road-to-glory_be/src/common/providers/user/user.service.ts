import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UnhandledException } from 'src/common/exceptions/unhandled.exceptio';
import { UserAlreadyExistsException } from 'src/common/exceptions/user-already-exists.exception';
import { User } from 'src/common/models/user/user.entity';
import { Repository, FindOptionsRelations } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ){}

    async save(user: User): Promise<User> {
        const potentialUser = await this.findUserByUsername(user.username);
        if (potentialUser) {
            throw new UserAlreadyExistsException();
        }
        return await this.userRepository.save(user)
    }


    findUserByUsername(username: string, relations?: FindOptionsRelations<User>) {
        try {
            return this.userRepository.findOne({ where: { username }, relations });
        } 
        catch (err) {
            throw new UnhandledException(err);
        }
    }
    async findUserById(id: number): Promise<User> {
        try {
            return await this.userRepository.findOneBy({id});
        } catch (err) {
            throw new Error(err)
        }
    }

}