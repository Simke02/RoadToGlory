import { Army } from "src/models/army/entities/army.entity";
import { GameObject } from "src/models/game_object/entities/game_object.entity";
import { Material } from "src/models/materials/entities/material.entity";
import { ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


export class Player {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(()=>Material)
    materials:Material;

    @ManyToOne(()=>Army)
    army:Army;

    @ManyToOne(()=>GameObject)
    gameObjects:GameObject;

    //ovde treba osvojene stvari dodati

    
}
