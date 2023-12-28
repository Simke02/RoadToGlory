import { Army } from "src/models/army/entities/army.entity";
import { GameObject } from "src/models/game_object/entities/game_object.entity";
import { Material } from "src/models/materials/entities/material.entity";

export interface PlayerI{
    id:number;
    name:string;
    lastName:string;
    materials:Material[];
    armies:Army[];
    gameObjects:GameObject[];
    conqured:GameObject[];
}