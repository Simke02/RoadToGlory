import { Unit } from "./unit.entity";

export class Artillery implements Unit{
    terrain: string;
    x_coor: number;
    y_coor: number;
    health: number;
    strenght: number;
    range: number;
    upgrade: string;
}