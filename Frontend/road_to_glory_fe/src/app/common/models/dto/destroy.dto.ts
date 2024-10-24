import { BasicFacility } from "../basic_facility.model";
import { Unit } from "../unit/unit.model";

export interface DestroyDto {
    attacker: Unit;
    object: BasicFacility;
    room: string;
}