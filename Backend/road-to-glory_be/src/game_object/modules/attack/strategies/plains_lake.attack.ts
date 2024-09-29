import { Unit } from "src/common/models/unit/unit.model";
import { AttackStrategy } from "./attack.strategy";

export class PlainLakeAttack implements AttackStrategy{
    attack(attacker: Unit, defender: Unit): { attacker: Unit; defender: Unit; } {
        defender.health -= 1.5 * attacker.strenght;
        attacker.health -= 0.5 * defender.strenght;

        return {
            attacker,
            defender
        }
    }

}