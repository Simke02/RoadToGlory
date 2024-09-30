import { BasicFacility } from "src/common/models/basic_facility.model";
import { Unit } from "src/common/models/unit/unit.model";
import { DestroyStrategy } from "./destroy.strategy";

export class FireDestroy implements DestroyStrategy {
    destroy(attacker: Unit, object: BasicFacility): { attacker: Unit; object: BasicFacility; } {
        object.health -= (attacker.strenght + 40);

        return {
            attacker,
            object
        }
    }
}