import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/common/models/user/user.entity';
import { UserAutomapperProfile } from './profile/user.profile';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers: [UserService, UserAutomapperProfile],
  exports: [UserService]
})
export class UserModule {}
