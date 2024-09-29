import { Unit } from "src/common/models/unit/unit.model";
import { AttackStrategy } from "./attack.strategy";

export class LakeForestAttack implements AttackStrategy{
    attack(attacker: Unit, defender: Unit): { attacker: Unit; defender: Unit; } {
        defender.health -= 0.4 * attacker.strenght;
        attacker.health -= 1.6 * defender.strenght;

        return {
            attacker,
            defender
        }
    }
}