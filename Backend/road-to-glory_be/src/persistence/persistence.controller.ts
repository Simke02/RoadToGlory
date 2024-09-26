import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersistenceService } from './persistence.service';
import { CreatePersistenceDto } from './dto/create-persistence.dto';
import { UpdatePersistenceDto } from './dto/update-persistence.dto';

@Controller('persistence')
export class PersistenceController {
  constructor(private readonly persistenceService: PersistenceService) {}

  @Post()
  create(@Body() createPersistenceDto: CreatePersistenceDto) {
    return this.persistenceService.create(createPersistenceDto);
  }

  @Get()
  findAll() {
    return this.persistenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.persistenceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersistenceDto: UpdatePersistenceDto) {
    return this.persistenceService.update(+id, updatePersistenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.persistenceService.remove(+id);
  }
}
