import { Unit } from "src/common/models/unit/unit.entity";
import { AttackStrategy } from "./attack.strategy";

export class PlainsForestStrategy implements AttackStrategy{
    attack(attacker: Unit, defender: Unit): { attacker: Unit; defender: Unit; } {
        defender.health -= 0.8 * attacker.strenght;
        attacker.health -= 1.2 * defender.strenght;

        return {
            attacker,
            defender
        }
    }

}