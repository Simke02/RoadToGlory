import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { AuthService } from "../auth.service";
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private auth_service:AuthService){
        super();
    }

    async validate(username: string, password): Promise<any>{
        const korisnik = await this.auth_service.auth(username, password);
        if(!korisnik){
            throw new UnauthorizedException('Invalid credentials');
        }
        return korisnik;
    }
}