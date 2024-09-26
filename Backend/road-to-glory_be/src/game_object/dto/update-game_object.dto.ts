import { PartialType } from '@nestjs/mapped-types';
import { CreateGameObjectDto } from './create-game_object.dto';

export class UpdateGameObjectDto extends CreateGameObjectDto {
    id:number;
    
}
