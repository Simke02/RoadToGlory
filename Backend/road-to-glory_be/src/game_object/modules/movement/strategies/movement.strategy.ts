import { PositionStep } from "src/common/models/position/position_step.model";

//Ovde mora da stigne polje koje je udaljeno za jedan od jedinice (na svih osam strana moze)

export interface MovementStrategy{
    move(final_position: PositionStep): {final_position: PositionStep, can_move: boolean};
}