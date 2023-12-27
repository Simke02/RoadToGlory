import { PartialType } from '@nestjs/mapped-types';
import { CreateArmyDto } from './create-army.dto';

export class UpdateArmyDto extends PartialType(CreateArmyDto) {}
