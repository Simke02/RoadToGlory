import { Army } from "src/models/army/entities/army.entity";
import { GameObject } from "src/models/game_object/entities/game_object.entity";
import { Player } from "src/models/player/entities/player.entity";

export interface MaterialI{
    id:number;
    type:string;
    gameObject:GameObject;
    quantity:number;
    player:Player;
}