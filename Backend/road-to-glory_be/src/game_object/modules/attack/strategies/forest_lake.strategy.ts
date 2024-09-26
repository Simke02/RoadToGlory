import { Unit } from "src/common/models/unit/unit.entity";
import { AttackStrategy } from "./attack.strategy";

export class ForestLakeStrategy implements AttackStrategy{
    attack(attacker: Unit, defender: Unit): { attacker: Unit; defender: Unit; } {
        defender.health -= 1.6 * attacker.strenght;
        attacker.health -= 0.4 * defender.strenght;

        return {
            attacker,
            defender
        }
    }
}