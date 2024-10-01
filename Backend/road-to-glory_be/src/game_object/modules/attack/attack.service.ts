import { Inject, Injectable } from '@nestjs/common';
import { Unit } from 'src/common/models/unit/unit.model';
import { AttackFactory } from './attack.factory';
import { UpgradeFactory } from './upgrade.factory';
import { Map } from 'src/common/providers/map/map';
import { AttackStrategy } from './strategies/attack.strategy';
import { PositionStep } from 'src/common/models/position/position_step.model';
import { NeighboursService } from 'src/common/providers/map/neighbours.service';

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
        const terrain_type = this.selectTerrainType(attacker, defender);
        const attack_strategy: AttackStrategy = this.attack_factory.createAttack(terrain_type);

        if(attacker.upgrade = "none") {
            return attack_strategy.attack(attacker, defender);
        }
        else {
            const upgrade_decorator = this.upgrade_factory.chooseUpgrade(attacker.upgrade, attack_strategy);
            return upgrade_decorator.attack(attacker, defender);
        }
    }

    //Sve jedinice koje jedinica moze da napadne
    whatCanUnitAttack(unit: Unit, enemy_units: Unit[]): Unit[] {
        let units_in_range: Unit[];

        let visited: PositionStep[] = [];
        let just_added: PositionStep[] = [];

        const start_pos = this.map.getPosition(unit.x_coor, unit.y_coor);
        visited.push(new PositionStep(start_pos, unit.range))
        just_added.push(new PositionStep(start_pos, unit.range));

        while(just_added.length > 0){
            let current: PositionStep = just_added.pop();

            //Provera da li je na toj poziciji neprijatelj
            let unit_in_range = enemy_units.find(enemy_unit =>
                enemy_unit.x_coor == current.x_coor && enemy_unit.y_coor == current.y_coor
            );

            if(unit_in_range)
                units_in_range.push(unit_in_range);

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

    private selectTerrainType(attacker: Unit, defender: Unit): string {
        let terrain_type;

        if(attacker.range > 1){
            terrain_type = "ranged";
        }
        else{
            const terrain_type_1 = this.map.getPosition(attacker.x_coor, attacker.y_coor).terrain;
            const terrain_type_2 = this.map.getPosition(defender.x_coor, defender.y_coor).terrain;

            if(terrain_type_1 === terrain_type_2){
                terrain_type = "same_same";
            }
            else{
                terrain_type = terrain_type_1;
                terrain_type += "_"
                terrain_type += terrain_type_2;
            }
        }

        return terrain_type;
    }
}
