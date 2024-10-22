import { Inject, Injectable } from '@nestjs/common';
import { DestroyFactory } from './destroy.factory';
import { Map } from 'src/common/providers/map/map';
import { Unit } from 'src/common/models/unit/unit.model';
import { BasicFacility } from 'src/common/models/basic_facility.model';
import { DestroyStrategy } from './strategies/destroy.strategy';
import { PositionStep } from 'src/common/models/position/position_step.model';
import { NeighboursService } from 'src/common/providers/map/neighbours.service';

@Injectable()
export class DestroyService {
    private destroy_factory: DestroyFactory;
    private neighbours_service: NeighboursService;

    constructor(@Inject('MAP') private readonly map: Map) {
        this.destroy_factory = new DestroyFactory();
        this.neighbours_service = new NeighboursService();
    }

    //Izvrsavanje konkretnog napada
    destroy(attacker: Unit, object: BasicFacility): { attacker: Unit; object: BasicFacility } {

        const destroy_strategy: DestroyStrategy = this.destroy_factory.createDestroy(attacker.upgrade);
        let result = destroy_strategy.destroy(attacker, object);
        result.attacker.finished_turn = true;
        this.updateMap(result.attacker, result.object);
        return result;
    }

    //Svi objekti koje jedinica moze da napadne
    whatCanUnitDestroy(unit: Unit, player: string/*enemy_objects: BasicFacility[]*/): PositionStep[]/*BasicFacility[]*/ {
        let objects_in_range: PositionStep[] = [];//BasicFacility[];

        let visited: PositionStep[] = [];
        let just_added: PositionStep[] = [];

        const start_pos = this.map.getPosition(unit.x_coor, unit.y_coor);
        visited.push(new PositionStep(start_pos, unit.range))
        just_added.push(new PositionStep(start_pos, unit.range));

        while(just_added.length > 0){
            let current: PositionStep = just_added.pop();

            //Provera da li je na toj poziciji neprijatelj
            /*let object_in_range = enemy_objects.find(enemy_object =>
                enemy_object.x_coor == current.x_coor && enemy_object.y_coor == current.y_coor
            );*/

            if(this.map.getOwner(current.x_coor, current.y_coor) !== player)
                if(this.map.getType(current.x_coor, current.y_coor) === "facility" ||
                    this.map.getType(current.x_coor, current.y_coor) === "resource" ||
                    this.map.getType(current.x_coor, current.y_coor) === "city")
                    objects_in_range.push(current);  

            /*if(object_in_range)
                objects_in_range.push(object_in_range);*/

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

                //Smanjuje za jedan range i dodaje ga u just_added
                neighbour.steps_left--;
                just_added.push(neighbour);
            }
        }

        return objects_in_range;
    }

    private updateMap(attacker: Unit, object: BasicFacility) {
        if(object.health <= 0 && attacker.health <= 0){
            this.map.setOwner(object.x_coor, object.y_coor, "");
            this.map.setType(object.x_coor, object.y_coor, "");
        }
        
        if(attacker.health <= 0){
            this.map.setOwner(attacker.x_coor, attacker.y_coor, "");
            this.map.setType(attacker.x_coor, attacker.y_coor, "");
        } 
    }
}
