import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req, UseGuards } from '@nestjs/common';
import { GameObjectService } from './game_object.service';
import { CreateGameObjectDto } from './dto/create-game_object.dto';
import { UpdateGameObjectDto } from './dto/update-game_object.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard';
import { Unit } from 'src/common/models/unit/unit.model';
import { AttackDto } from 'src/common/models/dto/attack.dto';
import { DestroyDto } from 'src/common/models/dto/destroy.dto';
import { MoveDto } from 'src/common/models/dto/move.dto';
import { NextTurnDto } from 'src/common/models/dto/next_turn.dto';
import { AddPlayerDto } from 'src/common/models/dto/add_player.dto';
import { UnitDto } from 'src/common/models/dto/unit.dto';

@Controller('game-object')
export class GameObjectController {
  constructor(
    private readonly gameObjectService: GameObjectService,
    private jwtService: JwtService 
  ) {}

  //Probaj kada postoji nesto iza
  @Get('whatCanBeBuilt/:x_coor/:y_coor/:room')
  @UseGuards(JwtGuard)
  whatCanBeBuilt(
    @Param('x_coor') x_coor: string,
    @Param('y_coor') y_coor: string,
    @Param('room') room: string) {
      const x = parseInt(x_coor, 10);
      const y = parseInt(y_coor, 10);
      return this.gameObjectService.whatCanBeBuilt(x, y, room);
  }

  //Probaj kada postoje neki objekti i jedinice
  @Post('unitTurnPossibilities')
  @UseGuards(JwtGuard)
  unitTurnPossibilities(
    @Body() unitDto: UnitDto) {
      return this.gameObjectService.unitTurnPossibilities(unitDto.unit, unitDto.room);
  }

  @Post('attack')
  @UseGuards(JwtGuard)
  attack(
    @Body() attackDto: AttackDto) {
      const {attacker, defender, room} = attackDto;
      return this.gameObjectService.attack(attacker, defender, room);
  }

  @Post('destroy')
  @UseGuards(JwtGuard)
  destroy(
    @Body() destroyDto: DestroyDto) {
      const {attacker, object, room} = destroyDto;
      return this.gameObjectService.destroy(attacker, object, room);
  }

  @Post('move')
  @UseGuards(JwtGuard)
  move(
    @Body() moveDto: MoveDto) {
      const {unit, final_position, room} = moveDto;
      return this.gameObjectService.move(unit, final_position, room);
  }

  @Get('produceUnit/:unit_type/:unit_name/:x_coor/:y_coor/:room')
  @UseGuards(JwtGuard)
  produceUnit(
    @Param('unit_type') unit_type: string,
    @Param('unit_name') unit_name: string,
    @Param('x_coor') x_coor: string,
    @Param('y_coor') y_coor: string,
    @Param('room') room: string) {
      const x = parseInt(x_coor, 10);
      const y = parseInt(y_coor, 10);
      return this.gameObjectService.produceUnit(unit_type, unit_name, x, y, room);
  }

  //NISAM PROBAO
  @Get('produceFacility/:facility_id/:x_coor/:y_coor/:room')
  @UseGuards(JwtGuard)
  produceFacility(
    @Param('facility_id') facility_id: string,
    @Param('x_coor') x_coor: string,
    @Param('y_coor') y_coor: string,
    @Param('room') room: string) {
      const x = parseInt(x_coor, 10);
      const y = parseInt(y_coor, 10);
      return this.gameObjectService.produceFacility(facility_id, x, y, room);
  }

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

  @Get('getTerrain/:room')
  @UseGuards(JwtGuard)
  getTerrain(@Param('room') room: string) {
    return this.gameObjectService.getTerrain(room);
  }

  @Get('getPosition/:x_coor/:y_coor/:room')
  @UseGuards(JwtGuard)
  getPosition(
    @Param('x_coor') x_coor: string,
    @Param('y_coor') y_coor: string,
    @Param('room') room: string) {
      const x = parseInt(x_coor, 10);
      const y = parseInt(y_coor, 10);
      return this.gameObjectService.getPosition(x, y, room);
  }

  @Post('addPlayer')
  @UseGuards(JwtGuard)
  addPlayer(
    @Body() addPlayerDto: AddPlayerDto) {
      return this.gameObjectService.addPlayer(addPlayerDto.player_name, addPlayerDto.room);
  }

  @Get('createGame/:room')
  createGame(@Param('room') room: string) {
    return this.gameObjectService.createGame(room);
  }

  @Post('nextTurn')
  @UseGuards(JwtGuard)
  nextTurn(
    @Body() nextTurnDto: NextTurnDto) {
      return this.gameObjectService.nextTurn(nextTurnDto.player_name, nextTurnDto.left, nextTurnDto.room);
  }

  @Post('endGame')
  endGame(@Body() body: { room: string }){
    return this.gameObjectService.endGame(body.room);
  }
}
