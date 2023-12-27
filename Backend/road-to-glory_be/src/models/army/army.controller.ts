import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArmyService } from './army.service';
import { CreateArmyDto } from './dto/create-army.dto';
import { UpdateArmyDto } from './dto/update-army.dto';

@Controller('army')
export class ArmyController {
  constructor(private readonly armyService: ArmyService) {}

  @Post()
  create(@Body() createArmyDto: CreateArmyDto) {
    return this.armyService.create(createArmyDto);
  }

  @Get()
  findAll() {
    return this.armyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.armyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArmyDto: UpdateArmyDto) {
    return this.armyService.update(+id, updateArmyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.armyService.remove(+id);
  }
}
