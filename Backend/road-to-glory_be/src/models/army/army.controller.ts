import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ArmyService } from './army.service';
import { CreateArmyDto } from './dto/create-army.dto';
import { UpdateArmyDto } from './dto/update-army.dto';
import { ApiParam } from '@nestjs/swagger';

@Controller('army')
export class ArmyController {
  constructor(private readonly armyService: ArmyService) {}

  @Post()
  create(@Body() createArmyDto: CreateArmyDto) {
    return this.armyService.AddArmy(createArmyDto);
  }

  @Get()
  findAll() {
    return this.armyService.findAll();
  }

  @Get('get/:id')
  @ApiParam({ name: "id", type: "number" })
  findOne(@Param('id') id: number) {
    return this.armyService.findOne(id);
  }

  @Put('update/:id')
  @ApiParam({ name: "id", type: "number" })
  update(@Param('id') id: number, @Body() updateArmyDto: UpdateArmyDto) {
    return this.armyService.update(id, updateArmyDto);
  }

  @Delete('delete/:id')
  @ApiParam({ name: "id", type: "number" })
  remove(@Param('id') id: number) {
    return this.armyService.remove(id);
  }
}
