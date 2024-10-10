import { PositionStep } from "../position/position_step.model";
import { Unit } from "../unit/unit.model";

export interface MoveDto{
    unit: Unit;
    final_position: PositionStep;
}