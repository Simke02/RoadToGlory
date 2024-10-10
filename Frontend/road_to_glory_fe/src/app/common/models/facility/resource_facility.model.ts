import { BasicFacility } from "../basic_facility.model";

export interface ResourceFacility extends BasicFacility{
    quantity: number; //Koliko proizvodi u svakom potezu
    type: string; //Ovo govori koji resource proizvodi
}