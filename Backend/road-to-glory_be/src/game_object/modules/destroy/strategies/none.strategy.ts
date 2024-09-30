import { Unit } from "src/common/models/unit/unit.model";
import { DestroyStrategy } from "./destroy.strategy";
import { BasicFacility } from "src/common/models/basic_facility.model";

export class NoneDestroy implements DestroyStrategy {
    destroy(attacker: Unit, object: BasicFacility): { attacker: Unit; object: BasicFacility; } {
        object.health -= attacker.strenght;

        return {
            attacker,
            object
        }
    }
}