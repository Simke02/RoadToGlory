import { Unit } from "src/common/models/unit/unit.entity";
import { AttackStrategy } from "./attack.strategy";

export class HillLakeStrategy implements AttackStrategy{
    attack(attacker: Unit, defender: Unit): { attacker: Unit; defender: Unit; } {
        defender.health -= 1.7 * attacker.strenght;
        attacker.health -= 0.3 * defender.strenght;

        return {
            attacker,
            defender
        }
    }
}