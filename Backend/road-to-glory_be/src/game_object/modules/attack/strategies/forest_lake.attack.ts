import { Unit } from "src/common/models/unit/unit.model";
import { AttackStrategy } from "./attack.strategy";

export class ForestLakeAttack implements AttackStrategy{
    attack(attacker: Unit, defender: Unit): { attacker: Unit; defender: Unit; } {
        defender.health -= 1.6 * attacker.strenght;
        attacker.health -= 0.4 * defender.strenght;

        return {
            attacker,
            defender
        }
    }
}