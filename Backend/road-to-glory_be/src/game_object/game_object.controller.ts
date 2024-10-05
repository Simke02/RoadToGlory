import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req, UseGuards } from '@nestjs/common';
import { GameObjectService } from './game_object.service';
import { CreateGameObjectDto } from './dto/create-game_object.dto';
import { UpdateGameObjectDto } from './dto/update-game_object.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard';

@Controller('game-object')
export class GameObjectController {
  constructor(
    private readonly gameObjectService: GameObjectService,
    private jwtService: JwtService 
  ) {}

  @Get('whatUpgrades')
  @UseGuards(JwtGuard)
  whatUpgradesExist(){
    return this.gameObjectService.whatUpgradesExist();
  }

  @Get('researchUpgrade/:what_upgrade')
  @UseGuards(JwtGuard)
  researchUpgrade(@Param('what_upgrade') what_upgrade: string) {
    return this.gameObjectService.researchUpgrade(what_upgrade);
  }

  @Get('produceFacility/:facility_id/:x_coor/:y_coor')
  @UseGuards(JwtGuard)
  produceFacility(
    @Param('facility_id') facility_id: string,
    @Param('x_coor') x_coor: number,
    @Param('y_coor') y_coor: number) {
      return this.gameObjectService.produceFacility(facility_id, x_coor, y_coor);
  }
}
