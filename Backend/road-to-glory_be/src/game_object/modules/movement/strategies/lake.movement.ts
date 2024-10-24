import { PositionStep } from "src/common/models/position/position_step.model";
import { MovementStrategy } from "./movement.strategy";

export class LakeMovement implements MovementStrategy{
    move(final_position: PositionStep): {final_position: PositionStep, can_move: boolean} {
        if(final_position.steps_left>=2 || final_position.steps == final_position.steps_left){
            final_position.steps_left -= 2;

            return {final_position, can_move: true};
        }

        return {final_position, can_move: false};
    }

}