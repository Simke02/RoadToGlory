import { BasicFacility } from "../basic_facility.model";

export interface Facility extends BasicFacility{
    iron_cost: number[];
    grain_cost: number[];
    unit_name: string[]; //Ovo sluzi za odabir konkretne jedinice (ako imamo vise istog tipa)
    type: string; //Ovo sluzi za odabir konkretnog factory
}