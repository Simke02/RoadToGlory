import { Inject, Injectable } from '@nestjs/common';
import { Unit } from 'src/common/models/unit/unit.model';
import { AttackFactory } from './attack.factory';
import { UpgradeFactory } from './upgrade.factory';
import { Map } from 'src/common/providers/map/map';
import { AttackStrategy } from './strategies/attack.strategy';
import { PositionStep } from 'src/common/models/position/position_step.model';
import { NeighboursService } from 'src/common/providers/map/neighbours.service';
import { Position } from 'src/common/models/position/position.model';

@Injectable()
export class AttackService {
    private attack_factory: AttackFactory;
    private upgrade_factory: UpgradeFactory;
    private neighbours_service: NeighboursService;

    constructor(@Inject('MAP') private readonly map: Map) {
        this.attack_factory = new AttackFactory();
        this.upgrade_factory = new UpgradeFactory();
        this.neighbours_service = new NeighboursService();
    }

    //Izvrsavanje konkretnog napada
    attack(attacker: Unit, defender: Unit): { attacker: Unit; defender: Unit; } {
        const strategy_type = this.selectStrategyType(attacker, defender);
        const attack_strategy: AttackStrategy = this.attack_factory.createAttack(strategy_type);
        const upgrade_decorator = this.upgrade_factory.chooseUpgrade(attacker.upgrade, attack_strategy);
        let result = upgrade_decorator.attack(attacker, defender);
        result.attacker.finished_turn = true;
        this.updateMap(result.attacker, result.defender);
        return result;
    }

    //Sve jedinice koje jedinica moze da napadne
    whatCanUnitAttack(unit: Unit, player: string/*enemy_units: Unit[]*/): PositionStep[]{//Unit[] {
        let units_in_range: PositionStep[] = [];//Unit[];

        let visited: PositionStep[] = [];
        let just_added: PositionStep[] = [];

        const start_pos = this.map.getPosition(unit.x_coor, unit.y_coor);
        visited.push(new PositionStep(start_pos, unit.range))
        just_added.push(new PositionStep(start_pos, unit.range));

        while(just_added.length > 0){
            let current: PositionStep = just_added.pop();

            //Provera da li je na toj poziciji neprijatelj
            /*let unit_in_range = enemy_units.find(enemy_unit =>
                enemy_unit.x_coor == current.x_coor && enemy_unit.y_coor == current.y_coor
            );*/
            if(this.map.getOwner(current.x_coor, current.y_coor) !== player)
                if(this.map.getType(current.x_coor, current.y_coor) === "unit")
                    units_in_range.push(current);            

            /*if(unit_in_range)
                units_in_range.push(unit_in_range);*/

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

        return units_in_range;
    }

    private selectStrategyType(attacker: Unit, defender: Unit): string {
        let strategy_type;

        if(attacker.range > 1){
            strategy_type = "ranged";
        }
        else{
            const terrain_type_1 = this.map.getPosition(attacker.x_coor, attacker.y_coor).terrain;
            const terrain_type_2 = this.map.getPosition(defender.x_coor, defender.y_coor).terrain;

            if(terrain_type_1 === terrain_type_2){
                strategy_type = "same_same";
            }
            else{
                strategy_type = terrain_type_1;
                strategy_type += "_"
                strategy_type += terrain_type_2;
            }
        }

        return strategy_type;
    }

    private updateMap(attacker: Unit, defender: Unit) {
        if(defender.health <= 0 && attacker.health <= 0){
            this.map.setOwner(defender.x_coor, defender.y_coor, "");
            this.map.setType(defender.x_coor, defender.y_coor, "");
        }
        
        if(attacker.health <= 0){
            this.map.setOwner(attacker.x_coor, attacker.y_coor, "");
            this.map.setType(attacker.x_coor, attacker.y_coor, "");
        } 
    }
}
