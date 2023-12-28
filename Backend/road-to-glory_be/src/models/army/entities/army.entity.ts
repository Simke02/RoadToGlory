import { Player } from "src/models/player/entities/player.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Army {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column({type:"varchar", length:128})
    image:string;

    @Column({type:"integer"})
    x_coordinate: number;
    
    @Column({type:"integer"})
    y_coordinate:number

    @Column({type:"double precision"})
    health:number;

    @Column({type:"double precision"})
    damage:number;

    @Column({type:"varchar", length:128})
    type:string;

    @Column({type:"integer"})
    range:number;

    
    @Column({type:"integer"})
    speed:number;

    @ManyToOne(()=>Player, (player)=>player.armies)
    player:Player;
}
