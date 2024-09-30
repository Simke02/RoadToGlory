import { Unit } from "./unit.model";

export class Tank implements Unit{
    finished_turn: boolean;
    x_coor: number;
    y_coor: number;
    health: number;
    strenght: number;
    range: number;
    steps: number;
    steps_left: number;
    upgrade: string;
}