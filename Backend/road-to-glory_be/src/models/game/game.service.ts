import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { from } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository:Repository<Game>
  ){}
  AddGame(createGameDto: CreateGameDto) {
    return from(this.gameRepository.save(createGameDto));
  }

  findAll() {
    return from(this.gameRepository.find());
  }

  async findOne(id: number) {
    const game = await from(this.gameRepository.findOne({
      where:{id:id}
    }))
    return game;
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    await this.gameRepository.update(id, updateGameDto)
    return this.findOne(id)
  }

  remove(id: number) {
    return this.gameRepository.delete({id});
  }
}
