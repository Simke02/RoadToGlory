import { Inject, Injectable } from '@nestjs/common';
import { MovementFactory } from './movement.factory';
import { Unit } from 'src/common/models/unit/unit.model';
import { Map } from 'src/common/providers/map/map';
import { MovementStrategy } from './strategies/movement.strategy';
import { PositionStep } from 'src/common/models/position/position_step.model';
import { NeighboursService } from 'src/common/providers/map/neighbours.service';

@Injectable()
export class MovementService {
    private movement_factory: MovementFactory;
    private neighbours_service: NeighboursService;

    constructor(@Inject('MAP') private readonly map: Map){
        this.movement_factory = new MovementFactory();
        this.neighbours_service = new NeighboursService();
    }

    //Izvrsavanje konkretnog kretanja
    move(unit: Unit, final_position: PositionStep): Unit{
        let owner: string = this.map.getOwner(unit.x_coor, unit.y_coor);
        this.map.setOwner(unit.x_coor, unit.y_coor, "");
        this.map.setType(unit.x_coor, unit.y_coor, "");
        unit.x_coor = final_position.x_coor;
        unit.y_coor = final_position.y_coor;
        unit.steps_left = final_position.steps_left;
        if(unit.steps_left === 0)
            unit.finished_turn = true;
        this.map.setOwner(unit.x_coor, unit.y_coor, owner);
        this.map.setType(unit.x_coor, unit.y_coor, "unit");
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
            neighbours = this.neighbours_service.addToNeighbours(current, this.map)

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
        positions.shift();

        return positions;
    }

    moveAfterAttack(attacker: Unit, new_x: number, new_y: number): Unit {
        let owner: string = this.map.getOwner(attacker.x_coor, attacker.y_coor);
        this.map.setOwner(attacker.x_coor, attacker.y_coor, "");
        this.map.setType(attacker.x_coor, attacker.y_coor, "");
        attacker.x_coor = new_x;
        attacker.y_coor = new_y;
        this.map.setOwner(attacker.x_coor, attacker.y_coor, owner);
        this.map.setType(attacker.x_coor, attacker.y_coor, "unit");
        return attacker;
    }
}
