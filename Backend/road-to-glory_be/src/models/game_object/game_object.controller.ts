import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GameObjectService } from './game_object.service';
import { CreateGameObjectDto } from './dto/create-game_object.dto';
import { UpdateGameObjectDto } from './dto/update-game_object.dto';

@Controller('game-object')
export class GameObjectController {
  constructor(private readonly gameObjectService: GameObjectService) {}

  @Post()
  create(@Body() createGameObjectDto: CreateGameObjectDto) {
    return this.gameObjectService.create(createGameObjectDto);
  }

  @Get()
  findAll() {
    return this.gameObjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameObjectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameObjectDto: UpdateGameObjectDto) {
    return this.gameObjectService.update(+id, updateGameObjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameObjectService.remove(+id);
  }
}
