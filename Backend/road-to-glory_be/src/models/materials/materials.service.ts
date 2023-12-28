import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Material } from './entities/material.entity';
import { Repository } from 'typeorm';
import { from } from 'rxjs';

@Injectable()
export class MaterialsService {

  constructor(
    @InjectRepository(Material)
    private materialRepository:Repository<Material>
  ){}

  AddMaterial(createMaterialDto: CreateMaterialDto) {
    return from(this.materialRepository.save(createMaterialDto))
  }

  findAll() {
    return from(this.materialRepository.find());
  }

  async findOne(id: number) {
    const material = await this.materialRepository.findOne({
      where: {id:id}
    })
    return material;
  }

  async update(id: number, updateMaterialDto: UpdateMaterialDto) {
    await this.materialRepository.update(id, updateMaterialDto);
    return this.materialRepository.findOne({
      where:{
        id:id
      }

    })
  }

  remove(id: number):Promise<any> {
    return this.materialRepository.delete({id:id})
  }
}
