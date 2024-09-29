import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

import { Request } from "express";
import { AUTHORIZATION_HEADER } from "src/common/headers/headers";
import { Configuration } from "src/persistence/configuration/model/configuration.model";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService<Configuration>) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.getJwt,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get("jwtSecret"),
    });
  }

  async validate(payload: any) {
    return payload;
  }

  static getJwt(req: Request) {
    return req.cookies[AUTHORIZATION_HEADER];
  }
}