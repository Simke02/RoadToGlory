import { FireUpgrade } from "./decorators/fire.upgrade";
import { GasUpgrade } from "./decorators/gas.upgrade";
import { NuclearUpgrade } from "./decorators/nuclear.upgrade";
import { UpgradeDecorator } from "./decorators/upgrade.decorator";
import { AttackStrategy } from "./strategies/attack.strategy";

export class UpgradeFactory{

    chooseUpgrade(upgrade_type: string, strategy: AttackStrategy): UpgradeDecorator{
        let upgrade: UpgradeDecorator;

        switch(upgrade_type) {
            case "nuclear":
                upgrade = new NuclearUpgrade(strategy);
                break;
            case "gas":
                upgrade = new GasUpgrade(strategy);
                break;
            case "fire":
                upgrade = new FireUpgrade(strategy);
                break;
        }

        return upgrade;
    }
}