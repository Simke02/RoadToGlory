import { Unit } from "src/common/models/unit/unit.model";
import { AttackStrategy } from "./attack.strategy";

export class HillsLakeAttack implements AttackStrategy{
    attack(attacker: Unit, defender: Unit): { attacker: Unit; defender: Unit; } {
        defender.health -= 1.7 * attacker.strenght;
        attacker.health -= 0.3 * defender.strenght;

        return {
            attacker,
            defender
        }
    }
}