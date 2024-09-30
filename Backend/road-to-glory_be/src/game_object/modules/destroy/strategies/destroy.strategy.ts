import { BasicFacility } from "src/common/models/basic_facility.model";
import { Unit } from "src/common/models/unit/unit.model";

export interface DestroyStrategy {
    destroy(attacker: Unit, object: BasicFacility): {attacker: Unit, object: BasicFacility};
}