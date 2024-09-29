import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PersistenceModule } from './persistence/persistence.module';
import { CommunicationModule } from './communication/communication.module';
import { GameObjectModule } from './game_object/game_object.module';
import { MapModule } from './common/providers/map/map.module';
import { UserService } from './common/providers/user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    autoLoadEntities:true,
    synchronize:true
  }),
    AuthModule,
    PersistenceModule,
    CommunicationModule,
    GameObjectModule,
    MapModule
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
