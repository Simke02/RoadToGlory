import { Army } from "src/models/army/entities/army.entity";
import { GameObject } from "src/models/game_object/entities/game_object.entity";
import { CreateMaterialDto } from "src/models/materials/dto/create-material.dto";
import { Material } from "src/models/materials/entities/material.entity";

export class CreatePlayerDto {
    name:string;
    lastName:string;
    materials:CreateMaterialDto[];
    armies:Army[];
    gameObjects:GameObject[]; 
    
}
