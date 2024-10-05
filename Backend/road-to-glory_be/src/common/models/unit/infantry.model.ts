import { Unit } from "./unit.model";

export class Infantry implements Unit{
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
        this.health = 300;
        this.strenght = 100;
        this.range = 1;
        this.steps = 1;
        this.steps_left = 0;
        this.upgrade = "none";
    }
}