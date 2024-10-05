import { Unit } from "./unit.model";

export class Artillery implements Unit{
    finished_turn: boolean;
    x_coor: number;
    y_coor: number;
    health: number;
    strenght: number;
    range: number;
    steps: number;
    steps_left: number;
    upgrade: string;

    constructor(x_coor: number, y_coor: number) {
        this.finished_turn = true;
        this.x_coor = x_coor;
        this.y_coor = y_coor;
        this.health = 500;
        this.strenght = 350;
        this.range = 3;
        this.steps = 2;
        this.steps_left = 0;
        this.upgrade = "none";
    }
}