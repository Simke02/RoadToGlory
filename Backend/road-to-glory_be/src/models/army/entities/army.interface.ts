import { Player } from "src/models/player/entities/player.entity";

export interface ArmyI{
    id:number;
    image:string;
    x_coordinate:number;
    y_coordinate:number;
    health:number;
    damage:number;
    type:string;
    range:number;
    player:Player;
    speed:number;
}