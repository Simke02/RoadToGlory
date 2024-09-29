import { Unit } from "src/common/models/unit/unit.model";
import { AttackStrategy } from "./attack.strategy";

export class ForestPlainsAttack implements AttackStrategy{
    attack(attacker: Unit, defender: Unit): { attacker: Unit; defender: Unit; } {
        defender.health -= 1.2 * attacker.strenght;
        attacker.health -= 0.8 * defender.strenght;

        return {
            attacker,
            defender
        }
    }
}