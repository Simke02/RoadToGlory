import { Unit } from "src/common/models/unit/unit.model";
import { UnitProductionFactory } from "./unit_production.factory";
import { Artillery } from "src/common/models/unit/artillery.model";

export class ArtilleryUnitProduction implements UnitProductionFactory {
    produceUnit(what_unit: string): Unit {
        let unit: Unit;

        switch(what_unit) {
            case "artillery":
                unit = new Artillery();
                break;
        }

        return unit;
    }

}