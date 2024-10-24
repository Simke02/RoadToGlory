import { Injectable } from "@nestjs/common";
import { PositionStep } from "src/common/models/position/position_step.model";
import { Map } from "./map";

@Injectable()
export class NeighboursService {
    //Odradi proveru da li postoje polja pored current i sve koje postoje dodaj
    addToNeighbours(current: PositionStep, map: Map): PositionStep[] {
        let neighbours: PositionStep[] = [];

        neighbours = this.addIfExists(current.x_coor, current.y_coor - 1, neighbours, current.steps_left, current.steps, map);
        neighbours = this.addIfExists(current.x_coor - 1, current.y_coor - 1, neighbours, current.steps_left, current.steps, map);
        neighbours = this.addIfExists(current.x_coor - 1, current.y_coor, neighbours, current.steps_left, current.steps, map);
        neighbours = this.addIfExists(current.x_coor - 1, current.y_coor + 1, neighbours, current.steps_left, current.steps, map);
        neighbours = this.addIfExists(current.x_coor, current.y_coor + 1, neighbours, current.steps_left, current.steps, map);
        neighbours = this.addIfExists(current.x_coor + 1, current.y_coor + 1, neighbours, current.steps_left, current.steps, map);
        neighbours = this.addIfExists(current.x_coor + 1, current.y_coor, neighbours, current.steps_left, current.steps, map);
        neighbours = this.addIfExists(current.x_coor + 1, current.y_coor - 1, neighbours, current.steps_left, current.steps, map);

        return neighbours;
    }

    private addIfExists(x_coor: number, y_coor: number, neighbours: PositionStep[], steps_left: number, steps: number, map: Map): PositionStep[] {
        if(0 <= x_coor && x_coor < map.getNumberOfRows()){
            if(0 <= y_coor && y_coor < map.getNumberOfColumns()){
                const result = map.getPosition(x_coor, y_coor);
                neighbours.push(new PositionStep(result, steps_left, steps));
            }
        }

        return neighbours;
    }
}