import { Player } from "src/models/player/entities/player.entity";

export interface GameI{
    id:number;
    player1:Player;
    player2:Player;
    time:number;
}