import { Unit } from "src/common/models/unit/unit.model";
import { AttackStrategy } from "./attack.strategy";

export class SameSameAttack implements AttackStrategy{

    attack(attacker: Unit, defender: Unit): {attacker: Unit, defender: Unit} {
        defender.health -= attacker.strenght;
        attacker.health -= defender.strenght;

        return {
            attacker,
            defender
        }
    }
    
}