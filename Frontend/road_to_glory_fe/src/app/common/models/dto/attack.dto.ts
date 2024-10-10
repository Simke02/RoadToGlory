import { Unit } from "../unit/unit.model";

export interface AttackDto {
    attacker: Unit;
    defender: Unit;
}