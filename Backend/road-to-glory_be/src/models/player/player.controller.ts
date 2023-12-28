import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { PlayerService } from './player.service';
import { ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Observable } from 'rxjs';
import { Response } from 'express';
import { Mapper } from "@automapper/core";


@Controller('player')
export class PlayerController {
  constructor(
    private readonly playerService: PlayerService,
    private readonly classMapper: Mapper
    ) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto):Observable<CreatePlayerDto> {
    return this.playerService.AddPlayer(createPlayerDto);
  }

  @Get('get')
  findAll() {
    return this.playerService.findAll();
  }

  @Get('get/:id')
  @ApiParam({ name: "id", type: "number" })
  findOne(@Param('id') id: number) {
    return this.playerService.findOne(id);
  }

  @Put('update/:id')
  @ApiParam({ name: "id", type: "number" })
  update(@Param('id') id: number, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playerService.update(id, updatePlayerDto);
  }

  @Delete('delete/:id')
  @ApiParam({ name: "id", type: "number" })
  @ApiOkResponse({ type: "string" })
  async remove(@Param('id') id: number, @Res() res:Response){
    await this.playerService.remove(id);
    res.sendStatus(HttpStatus.OK);
  }
}
