import { Unit } from "src/common/models/unit/unit.model";
import { UnitProductionFactory } from "./unit_production.factory";
import { Tank } from "src/common/models/unit/tank.model";

export class TankUnitProduction implements UnitProductionFactory{
    produceUnit(what_unit: string, x_coor: number, y_coor: number): Unit {
        let unit: Unit;

        switch(what_unit) {
            case "tank":
                unit = new Tank(x_coor, y_coor);
                break;
        }
        
        return unit;
    }

}