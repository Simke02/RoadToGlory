import { PartialType } from '@nestjs/mapped-types';
import { CreatePersistenceDto } from './create-persistence.dto';

export class UpdatePersistenceDto extends PartialType(CreatePersistenceDto) {}
