import { Unit } from "src/common/models/unit/unit.entity";
import { AttackStrategy } from "./attack.strategy";

export class SameSameStrategy implements AttackStrategy{

    attack(attacker: Unit, defender: Unit): {attacker: Unit, defender: Unit} {
        defender.health -= attacker.strenght;
        attacker.health -= defender.strenght;

        return {
            attacker,
            defender
        }
    }
    
}