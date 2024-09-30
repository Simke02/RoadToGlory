import { Unit } from "src/common/models/unit/unit.model";
import { AttackStrategy } from "../strategies/attack.strategy";
import { UpgradeDecorator } from "./upgrade.decorator";

export class FireUpgrade implements UpgradeDecorator{
    decorated_attack: AttackStrategy;

    constructor(decorated_attack: AttackStrategy){
        this.decorated_attack = decorated_attack;
    }

    attack(attacker: Unit, defender: Unit): { attacker: Unit; defender: Unit; } {
        var result = this.decorated_attack.attack(attacker, defender);
        result.defender.health -= 40;
        
        return result;
    }
}