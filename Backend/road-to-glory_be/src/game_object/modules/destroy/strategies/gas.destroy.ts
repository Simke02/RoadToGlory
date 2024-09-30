import { Unit } from "src/common/models/unit/unit.model";
import { DestroyStrategy } from "./destroy.strategy";
import { BasicFacility } from "src/common/models/basic_facility.model";

export class GasDestroy implements DestroyStrategy {
    destroy(attacker: Unit, object: BasicFacility): { attacker: Unit; object: BasicFacility; } {
        object.health -= (attacker.strenght + 30);

        return {
            attacker,
            object
        }
    }
}