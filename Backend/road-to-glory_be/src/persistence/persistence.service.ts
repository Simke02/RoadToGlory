import { Injectable } from '@nestjs/common';
import { CreatePersistenceDto } from './dto/create-persistence.dto';
import { UpdatePersistenceDto } from './dto/update-persistence.dto';

@Injectable()
export class PersistenceService {
  create(createPersistenceDto: CreatePersistenceDto) {
    return 'This action adds a new persistence';
  }

  findAll() {
    return `This action returns all persistence`;
  }

  findOne(id: number) {
    return `This action returns a #${id} persistence`;
  }

  update(id: number, updatePersistenceDto: UpdatePersistenceDto) {
    return `This action updates a #${id} persistence`;
  }

  remove(id: number) {
    return `This action removes a #${id} persistence`;
  }
}
