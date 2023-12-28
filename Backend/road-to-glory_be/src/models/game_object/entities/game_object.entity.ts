import { Material } from "src/models/materials/entities/material.entity";
import { Player } from "src/models/player/entities/player.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GameObject {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar",unique:false, length: 128})
    type:string;

    @Column({type:"double precision"})
    health:number;

    @ManyToOne(()=>Player, (player)=>player.gameObjects)
    player:Player;
    
    @Column({type:"integer"})
    x_coordinate: number;
    
    @Column({type:"integer"})
    y_coordinate:number;

    @Column({type:"varchar", length: 128})
    image:string;

    @ManyToMany(()=>Material, (material)=>material.gameObject)
    materials:Material[];


    //proizvodi i queue fali, s tim sto mislim da proizvodi ne treba da se navode 
    //nego da se odvoje fabrike za proizvodnju odredjenog objekta tako da ce to biti specificirano atributom type
}
