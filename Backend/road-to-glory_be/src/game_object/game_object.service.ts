import { Injectable } from '@nestjs/common';
import { CreateGameObjectDto } from './dto/create-game_object.dto';
import { UpdateGameObjectDto } from './dto/update-game_object.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GameObject } from './entities/game_object.entity';
import { Repository } from 'typeorm';
import { from } from 'rxjs';

@Injectable()
export class GameObjectService {

  constructor(
    @InjectRepository(GameObject)
    private gameObjectRepository:Repository<GameObject>
  ){}

  AddGameObject(createGameObjectDto: CreateGameObjectDto) {
    return from(this.gameObjectRepository.save(createGameObjectDto))
  }

  findAll() {
    return from(this.gameObjectRepository.find());
  }

  async findOne(id: number) {
    const gameObject = await this.gameObjectRepository.findOne({
      where: {id:id}
    })
    return gameObject;
  }

  async update(id: number, updateGameObjectDto: UpdateGameObjectDto) {
    await this.gameObjectRepository.update(id, updateGameObjectDto)
    return this.findOne(id); 
  }

  remove(id: number) {
    return this.gameObjectRepository.delete(id)
  }
}
