import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/common/providers/user/user.module';
import { config } from 'process';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
  UserModule,
],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
