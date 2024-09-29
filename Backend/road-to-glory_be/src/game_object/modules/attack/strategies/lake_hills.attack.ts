import { Unit } from "src/common/models/unit/unit.model";
import { AttackStrategy } from "./attack.strategy";

export class LakeHillsAttack implements AttackStrategy{
    attack(attacker: Unit, defender: Unit): { attacker: Unit; defender: Unit; } {
        defender.health -= 0.3 * attacker.strenght;
        attacker.health -= 1.7 * defender.strenght;

        return {
            attacker,
            defender
        }
    }
}