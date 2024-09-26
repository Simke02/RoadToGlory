import { Player } from "src/models/player/entities/player.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id:number;

    @OneToOne(()=>Player)
    @JoinColumn()
    player1:Player;

    @OneToOne(()=>Player)
    @JoinColumn()
    player2:Player;

    @Column({type:"integer"})
    time:number;

    //move ne bih znao kako a mozda i zasto 
}
