import { Unit } from "src/common/models/unit/unit.model";
import { AttackStrategy } from "./attack.strategy";

export class ForestHillsAttack implements AttackStrategy {
    attack(attacker: Unit, defender: Unit): { attacker: Unit; defender: Unit; } {
        defender.health -= 0.9 * attacker.strenght;
        attacker.health -= 1.1 * defender.strenght;

        return {
            attacker,
            defender
        }
    }
    
}