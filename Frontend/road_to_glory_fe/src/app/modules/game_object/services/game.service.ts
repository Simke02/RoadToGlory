import { Injectable } from "@angular/core";
import { Position } from "src/app/common/models/position/position.model";
import { GameObjectService } from "./game_object.service";
import { BuildingsDto } from "src/app/common/models/dto/buildings.dto";
import { Unit } from "src/app/common/models/unit/unit.model";
import { PositionStep } from "src/app/common/models/position/position_step.model";

@Injectable()
export class GameService {

    constructor(private game_object_service: GameObjectService) {}

    
}