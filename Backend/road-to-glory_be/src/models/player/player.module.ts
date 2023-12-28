import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Material } from '../materials/entities/material.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Player, Material])
  ],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
