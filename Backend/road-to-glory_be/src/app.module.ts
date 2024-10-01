import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PersistenceModule } from './persistence/persistence.module';
import { CommunicationModule } from './communication/communication.module';
import { GameObjectModule } from './game_object/game_object.module';
import { MapModule } from './common/providers/map/map.module';
import { UserService } from './common/providers/user/user.service';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { JwtModule } from '@nestjs/jwt';
import configuration from './persistence/configuration/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "src/common/environment/.env",
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    autoLoadEntities:true,
    synchronize:true
  }),
    AutomapperModule.forRoot({
    strategyInitializer: classes(),
  }),
    JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      return {
        secret: config.get("jwtSecret"),
        signOptions: { expiresIn: "3600s" },
      };
    },
    global: true,
  }),
    AuthModule,
    PersistenceModule,
    CommunicationModule,
    GameObjectModule,
    MapModule,
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
