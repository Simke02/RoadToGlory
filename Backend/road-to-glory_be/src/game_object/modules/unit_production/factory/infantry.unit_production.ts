import { Unit } from "src/common/models/unit/unit.model";
import { UnitProductionFactory } from "./unit_production.factory";
import { Infantry } from "src/common/models/unit/infantry.model";

export class InfantryUnitProduction implements UnitProductionFactory {
    produceUnit(what_unit: string): Unit {
        let unit: Unit;

        switch(what_unit) {
            case "infantry":
                unit = new Infantry();
                break;
        }

        return unit;
    }

}