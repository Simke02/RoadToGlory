import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';
import { from } from 'rxjs';

@Injectable()
export class PlayerService {

  constructor(
    @InjectRepository(Player)
    private playerRepository:Repository<Player>
  ){}

  AddPlayer(createPlayerDto: CreatePlayerDto) {
    const materials = {
      ...createPlayerDto.materials,
    }
    const player = {
      ...createPlayerDto,
      materials
    }
    return from(this.playerRepository.save(createPlayerDto));
  }

  findAll() {
    return from(this.playerRepository.find());
  }

  findOne(id: number) {
    return from(this.playerRepository.findOne({
      where: {id: id}
    }));
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<UpdatePlayerDto> {
    await this.playerRepository.update(id, updatePlayerDto)
    return this.playerRepository.findOne({
      where: {id:id}
    });
  }

  remove(id: number) {
    return this.playerRepository.delete({id});
  }
}
