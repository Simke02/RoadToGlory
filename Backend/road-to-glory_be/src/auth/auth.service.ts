import { Injectable } from '@nestjs/common';
import { UserService } from 'src/common/providers/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Mapper } from "@automapper/core"
import { InjectMapper } from "@automapper/nestjs"
import { UserNotFoundException } from 'src/common/exceptions/user-not-found.exception';
import { PasswordNotValidException } from 'src/common/exceptions/password-not-valid.exception';
import { User } from 'src/common/models/user/user.entity';
import * as bcrypt from "bcrypt";
import { MeUserInfoDto } from 'src/common/models/user/dto/me-user-info.dto';
import { access } from 'fs';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    @InjectMapper() private readonly classMapper:Mapper,
    private jwtService: JwtService,
  ){}

  async auth(username: string, password: string): Promise<MeUserInfoDto> {
    const potentialUser = await this.userService.findUserByUsername(username);
    if(!potentialUser){
      throw new UserNotFoundException();
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      potentialUser.password
    );
    if (!isPasswordMatch) {
      throw new PasswordNotValidException();
    }
    return this.classMapper.map(potentialUser, User, MeUserInfoDto)

  }

  async login(user:any){

    return this.jwtService.sign({
        username: user.username
      });
    
  }


  

}
