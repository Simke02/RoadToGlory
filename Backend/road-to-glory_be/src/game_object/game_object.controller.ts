import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { GameObjectService } from './game_object.service';
import { CreateGameObjectDto } from './dto/create-game_object.dto';
import { UpdateGameObjectDto } from './dto/update-game_object.dto';

@Controller('game-object')
export class GameObjectController {
  constructor(private readonly gameObjectService: GameObjectService) {}

}
