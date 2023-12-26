import { Injectable } from '@nestjs/common';
import { CreateArmyDto } from './dto/create-army.dto';
import { UpdateArmyDto } from './dto/update-army.dto';

@Injectable()
export class ArmyService {
  create(createArmyDto: CreateArmyDto) {
    return 'This action adds a new army';
  }

  findAll() {
    return `This action returns all army`;
  }

  findOne(id: number) {
    return `This action returns a #${id} army`;
  }

  update(id: number, updateArmyDto: UpdateArmyDto) {
    return `This action updates a #${id} army`;
  }

  remove(id: number) {
    return `This action removes a #${id} army`;
  }
}
