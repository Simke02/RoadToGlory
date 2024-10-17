import { ResourceFacility } from "./resource_facility.model";

export class Farm implements ResourceFacility {
    quantity: number;
    health: number;
    type: string;
    x_coor: number;
    y_coor: number;
    icon: string;

    constructor(x_coor: number, y_coor: number) {
        this.quantity = 10;
        this.health = 1000;
        this.type = "grain"
        this.x_coor = x_coor;
        this.y_coor = y_coor;
        this.icon = "r-farm";
    }
}