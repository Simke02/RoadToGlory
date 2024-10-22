import { BasicFacility } from "../basic_facility.model";

export interface City extends BasicFacility{
    x_coor: number;
    y_coor: number;
    health: number;
    icon: string;
}