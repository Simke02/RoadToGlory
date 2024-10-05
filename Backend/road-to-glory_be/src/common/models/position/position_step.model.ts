import { Position } from "./position.model";

export class PositionStep implements Position{
    x_coor: number;
    y_coor: number;
    terrain: string;
    owner: string;
    type: string;
    steps_left: number;

    constructor(position: Position, steps_left: number) {
        this.x_coor = position.x_coor;
        this.y_coor = position.y_coor;
        this.terrain = position.terrain;
        this.owner = position.owner;
        this.type = position.type;
        this.steps_left = steps_left;
    }
}