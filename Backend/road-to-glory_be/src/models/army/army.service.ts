import { Injectable } from '@nestjs/common';
import { CreateArmyDto } from './dto/create-army.dto';
import { UpdateArmyDto } from './dto/update-army.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Army } from './entities/army.entity';
import { Repository } from 'typeorm';
import { find, from } from 'rxjs';
import { ForeignKeyMetadata } from 'typeorm/metadata/ForeignKeyMetadata';

@Injectable()
export class ArmyService {

  constructor(
    @InjectRepository(Army)
    private armyRepository:Repository<Army>
  ){}

  AddArmy(createArmyDto: CreateArmyDto) {
    return from(this.armyRepository.save(createArmyDto));
  }

  findAll() {
    return from(this.armyRepository.find());
  }

  async findOne(id: number) {
    const army = await from(this.armyRepository.findOne({
      where:{id:id}
    }))
    return army;
  }

  async update(id: number, updateArmyDto: UpdateArmyDto) {
    await this.armyRepository.update(id, updateArmyDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.armyRepository.delete(id)
  }
}
