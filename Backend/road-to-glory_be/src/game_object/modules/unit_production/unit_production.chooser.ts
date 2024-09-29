import { ArtilleryUnitProduction } from "./factory/artillery.unit_production";
import { InfantryUnitProduction } from "./factory/infantry.unit_production";
import { TankUnitProduction } from "./factory/tank.unit_production";
import { UnitProductionFactory } from "./factory/unit_production.factory";

export class UnitProductionChooser{
    private unit_productions: Record<string, UnitProductionFactory> = {
        artillery: new ArtilleryUnitProduction(),
        infantry: new InfantryUnitProduction(),
        tank: new TankUnitProduction()
    };

    chooseUnitType(unit_type: string): UnitProductionFactory{
        return this.unit_productions[unit_type];
    }
}