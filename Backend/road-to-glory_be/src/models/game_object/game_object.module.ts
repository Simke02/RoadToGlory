import { Module } from '@nestjs/common';
import { GameObjectService } from './game_object.service';
import { GameObjectController } from './game_object.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameObject } from './entities/game_object.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([GameObject])
  ],
  controllers: [GameObjectController],
  providers: [GameObjectService],
})
export class GameObjectModule {}
