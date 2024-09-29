import { Unit } from "src/common/models/unit/unit.model";
import { UnitProductionFactory } from "./unit_production.factory";
import { Tank } from "src/common/models/unit/tank.model";

export class TankUnitProduction implements UnitProductionFactory{
    produceUnit(what_unit: string): Unit {
        let unit: Unit;

        switch(what_unit) {
            case "barracks":
                unit = new Tank();
                break;
        }

        return unit;
    }

}