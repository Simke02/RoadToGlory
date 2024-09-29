import { Unit } from "src/common/models/unit/unit.model";

export interface UnitProductionFactory {
    produceUnit(what_unit: string): Unit;
}