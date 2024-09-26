import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { ApiParam } from '@nestjs/swagger';
import { Observable } from 'rxjs';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gameService.AddGame(createGameDto);
  }

  @Get()
  findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: "id", type: "number" })
  findOne(@Param('id') id: number) {
    return this.gameService.findOne(id);
  }

  @Put('update/:id')
  @ApiParam({ name: "id", type: "number" })
  update(@Param('id') id: number, @Body() updateGameDto: UpdateGameDto) {
    return this.gameService.update(id, updateGameDto);
  }

  @Delete('delete/:id')
  @ApiParam({ name: "id", type: "number" })
  remove(@Param('id') id: number) {
    return this.gameService.remove(id);
  }
}
