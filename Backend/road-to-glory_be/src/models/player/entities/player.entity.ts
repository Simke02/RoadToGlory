import { Army } from "src/models/army/entities/army.entity";
import { GameObject } from "src/models/game_object/entities/game_object.entity";
import { Material } from "src/models/materials/entities/material.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"varchar", length:128})
    name:string;

    @Column({type:"varchar", length:128})
    lastName:string;

    @OneToMany(()=>Army, (army)=>army.player)
    armies:Army[]

    @OneToMany(()=>GameObject, (gameObject)=>gameObject.player)
    gameObjects:GameObject[];

    //ovde treba osvojene stvari dodati
    @OneToMany(()=>GameObject, (gameObject)=>gameObject.player)
    conqured:GameObject[];

    @OneToMany(()=>Material, (material)=>material.player)
    materials:Material[]


}
