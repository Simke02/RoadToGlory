import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerDto } from './create-player.dto';
import { Material } from 'src/models/materials/entities/material.entity';
import { Army } from 'src/models/army/entities/army.entity';
import { GameObject } from 'src/models/game_object/entities/game_object.entity';

export class UpdatePlayerDto extends CreatePlayerDto {
    id:number;
    //trena i osvojene stvari
}
