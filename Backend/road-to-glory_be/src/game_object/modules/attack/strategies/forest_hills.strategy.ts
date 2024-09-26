import { Unit } from "src/common/models/unit/unit.entity";
import { AttackStrategy } from "./attack.strategy";

export class ForestHillsStrategy implements AttackStrategy {
    attack(attacker: Unit, defender: Unit): { attacker: Unit; defender: Unit; } {
        defender.health -= 0.9 * attacker.strenght;
        attacker.health -= 1.1 * defender.strenght;

        return {
            attacker,
            defender
        }
    }
    
}