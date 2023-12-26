import { Army } from "src/models/army/entities/army.entity";
import { GameObject } from "src/models/game_object/entities/game_object.entity";
import { Material } from "src/models/materials/entities/material.entity";

export interface Player{
    id:number;
    materials:Material;
    army:Army;
    gameObjects:GameObject;
    //dodati za osvojene stvari
}