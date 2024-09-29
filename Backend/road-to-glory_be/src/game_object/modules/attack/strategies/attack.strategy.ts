import { Unit } from "src/common/models/unit/unit.model";

export interface AttackStrategy{
    attack(attacker: Unit, defender: Unit): {attacker: Unit, defender: Unit};
}