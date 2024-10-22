import { BasicFacility } from "../basic_facility.model";

export class City implements BasicFacility{
    x_coor: number;
    y_coor: number;
    health: number;
    icon: string;
    
    constructor(x_coor: number, y_coor: number){
        this.x_coor = x_coor;
        this.y_coor = y_coor;
        this.health = 5000;
        this.icon = "city";
    }
}