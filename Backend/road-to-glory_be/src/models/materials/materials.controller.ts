import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { ApiParam } from '@nestjs/swagger';

@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialsService.AddMaterial(createMaterialDto);
  }

  @Get('get')
  findAll() {
    return this.materialsService.findAll();
  }

  @Get('get/:id')
  @ApiParam({ name: "id", type: "number" })
  findOne(@Param('id') id: number) {
    return this.materialsService.findOne(id);
  }

  @Put('update/:id')
  @ApiParam({ name: "id", type: "number" })
  update(@Param('id') id: number, @Body() updateMaterialDto: UpdateMaterialDto) {
    return this.materialsService.update(id, updateMaterialDto);
  }

  @Delete('delete/:id')
  @ApiParam({ name: "id", type: "number" })
  remove(@Param('id') id: number) {
    return this.materialsService.remove(id);
  }
}
