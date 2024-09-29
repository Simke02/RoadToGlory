import { Facility } from "./facility.model";

export class Barracks implements Facility{
    health: number;
    iron_cost: number[];
    grain_cost: number[];
    unit_name: string[];
    type: string;

    constructor() {
        this.health = 1500;
        this.iron_cost = [];
        this.iron_cost.push(25);
        this.grain_cost = [];
        this.grain_cost.push(75);
        this.unit_name = [];
        this.unit_name.push("infantry");
        this.type = "infantry";
    }
}