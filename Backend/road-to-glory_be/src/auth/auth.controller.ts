import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseFilters, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/common/providers/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { UserCreateDto } from 'src/common/models/user/dto/user-create.dto';
import { User } from 'src/common/models/user/user.entity';
import { Response, Request } from 'express';
import { UserAlreadyExistsExceptionFilter } from 'src/common/filters/exceptions/user-already-exists-exception.filter';
import { UserNotFoundExceptionFilter } from 'src/common/filters/exceptions/user-not-found-exception.filter';
import { PasswordNotValidExceptionFilter } from 'src/common/filters/exceptions/password-not-valid-exception.filter';
import { AUTHORIZATION_HEADER } from 'src/common/headers/headers';
import { JwtGuard } from './guards/jwt/jwt.guard';
import { MeUserInfoDto } from 'src/common/models/user/dto/me-user-info.dto';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private jwtService: JwtService,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}
  
  @Post("")
  @UseFilters(new UserAlreadyExistsExceptionFilter())
  async registerUser(
    @Body() userCreateDto: UserCreateDto,
    @Res() res: Response,
  ){
    const user = this.classMapper.map(userCreateDto, UserCreateDto, User);
    
    console.log(user);
    await this.userService.save(user);
    return res.status(HttpStatus.OK).json({ message: "User registered successfully" });
  }

  @Post("auth")
  @UseFilters(UserNotFoundExceptionFilter)
  @UseFilters(PasswordNotValidExceptionFilter)
  async auth(@Body() authDto: AuthDto, @Res() res: Response){
    const [me, token] = await this.authService.auth(
      authDto.username,
      authDto.password
    );
    res.cookie(AUTHORIZATION_HEADER, token, {httpOnly: true});
    res.send(me);
  }

  @Get("me")
  @UseGuards(JwtGuard)
  async getUserInfo(@Res() res: Response, @Req() req: Request) {
    const user = await this.userService.findUserByUsername(
      this.jwtService.decode(req.cookies[AUTHORIZATION_HEADER])["username"]
    );
    res.send(this.classMapper.map(user, User, MeUserInfoDto));
  }
 
}
