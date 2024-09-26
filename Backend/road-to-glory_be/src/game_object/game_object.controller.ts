import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { GameObjectService } from './game_object.service';
import { CreateGameObjectDto } from './dto/create-game_object.dto';
import { UpdateGameObjectDto } from './dto/update-game_object.dto';
import { ApiParam } from '@nestjs/swagger';

@Controller('game-object')
export class GameObjectController {
  constructor(private readonly gameObjectService: GameObjectService) {}

  @Post()
  create(@Body() createGameObjectDto: CreateGameObjectDto) {
    return this.gameObjectService.AddGameObject(createGameObjectDto);
  }

  @Get('get')
  findAll() {
    return this.gameObjectService.findAll();
  }

  @Get('get/:id')
  @ApiParam({ name: "id", type: "number" })
  findOne(@Param('id') id: number) {
    return this.gameObjectService.findOne(+id);
  }

  @Put('update/:id')
  @ApiParam({ name: "id", type: "number" })
  update(@Param('id') id: number, @Body() updateGameObjectDto: UpdateGameObjectDto) {
    return this.gameObjectService.update(id, updateGameObjectDto);
  }

  @Delete('delete/:id')
  @ApiParam({ name: "id", type: "number" })
  remove(@Param('id') id: number) {
    return this.gameObjectService.remove(id);
  }
}
