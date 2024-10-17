import { Unit } from "src/common/models/unit/unit.model";
import { UnitProductionFactory } from "./unit_production.factory";
import { Infantry } from "src/common/models/unit/infantry.model";

export class InfantryUnitProduction implements UnitProductionFactory {
    produceUnit(what_unit: string, x_coor: number, y_coor: number, id: number): Unit {
        let unit: Unit;

        switch(what_unit) {
            case "infantry":
                unit = new Infantry(x_coor, y_coor, id);
                break;
        }

        return unit;
    }

}