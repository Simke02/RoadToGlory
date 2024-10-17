import { Injectable} from "@angular/core";
import { Position } from "src/app/common/models/position/position.model";
import { GameObjectService } from "./game_object.service";
import { BuildingsDto } from "src/app/common/models/dto/buildings.dto";
import { Unit } from "src/app/common/models/unit/unit.model";
import { PositionStep } from "src/app/common/models/position/position_step.model";
import { BasicFacility } from "src/app/common/models/basic_facility.model";
import { ResourceFacility } from "src/app/common/models/facility/resource_facility.model";
import { Facility } from "src/app/common/models/facility/facility.model";

@Injectable()
export class GameService {

    constructor() {}

    isResourceFacility(obj: BasicFacility): obj is ResourceFacility {
        return 'quantity' in obj;
      }
      
    isProductionFacility(obj: BasicFacility): obj is Facility {
        return 'unit_name' in obj;
    }

    isBasicFacility(obj: any): obj is BasicFacility {
        return 'x_coor' in obj;
    }

    isUnit(obj: any): obj is Unit {
        return 'x_coor' in obj;
    }
}