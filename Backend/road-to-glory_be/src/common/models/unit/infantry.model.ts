import { Unit } from "./unit.model";

export class Infantry implements Unit{
    can_attack: boolean;
    x_coor: number;
    y_coor: number;
    health: number;
    strenght: number;
    range: number;
    steps: number;
    steps_left: number;
    upgrade: string;
}