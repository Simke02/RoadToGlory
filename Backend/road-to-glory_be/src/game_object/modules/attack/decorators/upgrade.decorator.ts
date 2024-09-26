import { AttackStrategy } from "../strategies/attack.strategy";

export interface UpgradeDecorator extends AttackStrategy{
    decorated_attack: AttackStrategy;
}