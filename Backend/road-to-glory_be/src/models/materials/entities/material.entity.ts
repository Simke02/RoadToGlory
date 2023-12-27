
import { Army } from "src/models/army/entities/army.entity";
import { GameObject } from "src/models/game_object/entities/game_object.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Material {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column({type:"varchar", unique:true})
    type:string;
    

    

}
