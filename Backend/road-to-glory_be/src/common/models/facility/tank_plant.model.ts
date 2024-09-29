import { Facility } from "./facility.model";

export class TankPlant implements Facility{
    health: number;
    iron_cost: number[];
    grain_cost: number[];
    unit_name: string[];
    type: string;

    constructor() {
        this.health = 1500;
        this.iron_cost = [];
        this.iron_cost.push(50);
        this.grain_cost = [];
        this.grain_cost.push(50);
        this.unit_name = [];
        this.unit_name.push("tank");
        this.type = "tank";
    }
}