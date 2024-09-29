import { Inject, Injectable } from '@nestjs/common';
import { MovementFactory } from './movement.factory';
import { Unit } from 'src/common/models/unit/unit.model';
import { Map } from 'src/common/providers/map/map';
import { MovementStrategy } from './strategies/movement.strategy';
import { PositionStep } from 'src/common/models/position/position_step.model';

@Injectable()
export class MovementService {
    private movement_factory: MovementFactory;

    constructor(@Inject('MAP') private readonly map: Map){
        this.movement_factory = new MovementFactory();
    }

    //Izvrsavanje konkretnog kretanja
    move(unit: Unit, final_position: PositionStep): Unit{
        let owner: string = this.map.getOwner(unit.x_coor, unit.y_coor);
        this.map.setOwner(unit.x_coor, unit.y_coor, "");
        unit.x_coor = final_position.x_coor;
        unit.y_coor = final_position.y_coor;
        unit.steps_left = final_position.steps_left;
        this.map.setOwner(unit.x_coor, unit.y_coor, owner);
        return unit;
    }

    //Sva polja na koje jedinica moze da ode
    whereCanUnitGo(unit: Unit): PositionStep[] {
        let positions: PositionStep[] = [];
        let visited: PositionStep[] = [];
        let just_added: PositionStep[] = [];

        const start_pos = this.map.getPosition(unit.x_coor, unit.y_coor);
        visited.push(new PositionStep(start_pos, unit.steps_left))
        just_added.push(new PositionStep(start_pos, unit.steps_left));

        while(just_added.length > 0){
            let current: PositionStep = just_added.pop();
            positions.push(current);

            if(current.steps_left == 0){
                continue;
            }

            let neighbours: PositionStep[]
            neighbours = this.addToNeighbours(current)

            for (let i = 0; i < neighbours.length; i++) {
                let neighbour = neighbours[i];

                //Provera da li je vec obidjen
                const exists = visited.some(position =>
                    position.x_coor === neighbour.x_coor && position.y_coor === neighbour.y_coor
                );

                if(exists)
                    continue;

                visited.push(neighbour);
                
                //Provera da li je nesto na njemu
                if(neighbour.owner !== "")
                    continue;

                //Provera da li moze da stigne na njega
                let movement_strategy: MovementStrategy = this.movement_factory.createMovement(neighbour.terrain);
                let result = movement_strategy.move(neighbour);

                if(result.can_move){
                    just_added.push(result.final_position);
                }
            }
        }

        return positions;
    }


    //Odradi proveru da li postoje polja pored current i sve koje postoje dodaj
    private addToNeighbours(current: PositionStep): PositionStep[] {
        let neighbours: PositionStep[];

        neighbours = this.addIfExists(current.x_coor, current.y_coor - 1, neighbours, current.steps_left);
        neighbours = this.addIfExists(current.x_coor - 1, current.y_coor - 1, neighbours, current.steps_left);
        neighbours = this.addIfExists(current.x_coor - 1, current.y_coor, neighbours, current.steps_left);
        neighbours = this.addIfExists(current.x_coor - 1, current.y_coor + 1, neighbours, current.steps_left);
        neighbours = this.addIfExists(current.x_coor, current.y_coor + 1, neighbours, current.steps_left);
        neighbours = this.addIfExists(current.x_coor + 1, current.y_coor + 1, neighbours, current.steps_left);
        neighbours = this.addIfExists(current.x_coor + 1, current.y_coor, neighbours, current.steps_left);
        neighbours = this.addIfExists(current.x_coor + 1, current.y_coor - 1, neighbours, current.steps_left);

        return neighbours;
    }

    private addIfExists(x_coor: number, y_coor: number, neighbours: PositionStep[], steps_left: number): PositionStep[] {
        if(0 <= x_coor && x_coor < this.map.getNumberOfRows()){
            if(0 <= y_coor && y_coor < this.map.getNumberOfColumns()){
                const result = this.map.getPosition(x_coor, y_coor);
                neighbours.push(new PositionStep(result, steps_left));
            }
        }

        return neighbours;
    }
}
