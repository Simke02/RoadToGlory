import { DestroyStrategy } from "./strategies/destroy.strategy";
import { FireDestroy } from "./strategies/fire.destroy";
import { GasDestroy } from "./strategies/gas.destroy";
import { NoneDestroy } from "./strategies/none.strategy";
import { NuclearDestroy } from "./strategies/nuclear.destroy";

export class DestroyFactory {
    private destroy_strategies: Record<string, DestroyStrategy> = {
        fire: new FireDestroy(),
        gas: new GasDestroy(),
        nuclear: new NuclearDestroy(),
        none: new NoneDestroy()
    };

    createDestroy(upgradeType: string): DestroyStrategy{
        return this.destroy_strategies[upgradeType];
    }
}