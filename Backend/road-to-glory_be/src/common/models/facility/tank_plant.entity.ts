import { Facility } from "./facility.entity";

export class TankPlant implements Facility{
    health: number;
    iron_cost: number[];
    grain_cost: number[];
    unit_name: string[];
    
}