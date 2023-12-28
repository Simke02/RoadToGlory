
import { Army } from "src/models/army/entities/army.entity";
import { GameObject } from "src/models/game_object/entities/game_object.entity";
import { Player } from "src/models/player/entities/player.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Material {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column({type:"varchar", unique:true})
    type:string;
    
    @Column({type:"integer"})
    quantity:number;

    @ManyToOne(()=>Player, (player)=>player.materials)
    player:Player;

    @ManyToMany(()=>GameObject, (gameObject)=>gameObject.materials)
    gameObject:GameObject

}
