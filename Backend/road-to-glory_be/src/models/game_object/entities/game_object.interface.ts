import { Material } from "src/models/materials/entities/material.entity";

export interface GameObjectI{
    id:number;
    type:string;
    health:number;
    x_coordinate:number;
    y_coordinate:number;
    image:string;
    materials:Material[];
}