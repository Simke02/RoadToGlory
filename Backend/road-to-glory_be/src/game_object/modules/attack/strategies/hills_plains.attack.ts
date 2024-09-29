import { Unit } from "src/common/models/unit/unit.model";
import { AttackStrategy } from "./attack.strategy";

export class HillsPlainsAttack implements AttackStrategy{
    attack(attacker: Unit, defender: Unit): { attacker: Unit; defender: Unit; } {
        defender.health -= 1.4 * attacker.strenght;
        attacker.health -= 0.6 * defender.strenght;

        return {
            attacker,
            defender
        }
    }

}