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
    icon: string;
    id: number;

    constructor(x_coor: number, y_coor: number, id: number) {
        this.finished_turn = true;
        this.x_coor = x_coor;
        this.y_coor = y_coor;
        this.health = 700;
        this.strenght = 250;
        this.range = 1;
        this.steps = 3;
        this.steps_left = 0;
        this.upgrade = "none";
        this.icon = "tank";
        this.id = id;
    }
}