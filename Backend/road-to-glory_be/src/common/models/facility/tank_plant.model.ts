import { Facility } from "./facility.model";

export class TankPlant implements Facility{
    health: number;
    iron_cost: number[];
    grain_cost: number[];
    unit_name: string[];
    type: string;
    x_coor: number;
    y_coor: number;

    constructor(x_coor: number, y_coor: number) {
        this.health = 1500;
        this.iron_cost = [];
        this.iron_cost.push(50);
        this.grain_cost = [];
        this.grain_cost.push(50);
        this.unit_name = [];
        this.unit_name.push("tank");
        this.type = "tank";
        this.x_coor = x_coor;
        this.y_coor = y_coor;
    }
}