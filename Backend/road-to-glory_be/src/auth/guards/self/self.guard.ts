import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt"
import { AUTHORIZATION_HEADER } from 'src/common/headers/headers';
import { UserService } from 'src/common/providers/user/user.service';

@Injectable()
export class SelfGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ){}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies[AUTHORIZATION_HEADER];
    const jwtBody: any = this.jwtService.decode(jwt);
    
    const url:String = context.switchToHttp().getRequest().url;
    const userForUpdateId = Number.parseInt(
      url.substring(url.lastIndexOf("/")+1, url.length),
    );

    const user = await this.userService.findUserByUsername(jwtBody.username);

    return user.id === userForUpdateId;
  }
}
