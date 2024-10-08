import { Unit } from "src/common/models/unit/unit.model";
import { AttackStrategy } from "./attack.strategy";

export class PlainsHillsAttack implements AttackStrategy{
    attack(attacker: Unit, defender: Unit): { attacker: Unit; defender: Unit; } {
        defender.health -= 0.6 * attacker.strenght;
        attacker.health -= 1.4 * defender.strenght;

        return {
            attacker,
            defender
        }
    }

}