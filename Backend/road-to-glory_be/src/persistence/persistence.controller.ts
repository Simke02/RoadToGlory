import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PersistenceService } from './persistence.service';
import { AddStatsDto } from 'src/common/models/dto/add_stats.dto';

@Controller('persistence')
export class PersistenceController {
  constructor(private readonly persistenceService: PersistenceService) {}

  @Put('addStats')
  async addStats(@Body() addStatsDto: AddStatsDto){
    await this.persistenceService.addStats(addStatsDto.won, addStatsDto.lost);
  }

  @Post('createStats')
  async createStats(
    @Body() body: {username: string}
  ) {
    await this.persistenceService.createStats(body.username);
  }

  @Get('userStats/:username')
  async userStats(
    @Param('username') username: string
  ) {
    return this.persistenceService.userStats(username);
  }

  @Get('bestStats')
  async bestStats() {
    return this.persistenceService.bestStats();
  }
}
