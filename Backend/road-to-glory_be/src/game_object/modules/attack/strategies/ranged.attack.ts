import { Unit } from "src/common/models/unit/unit.model";
import { AttackStrategy } from "./attack.strategy";

export class RangedAttack implements AttackStrategy {
    attack(attacker: Unit, defender: Unit): { attacker: Unit; defender: Unit; } {
        defender.health -= attacker.strenght;

        return {
            attacker,
            defender
        }
    }
}