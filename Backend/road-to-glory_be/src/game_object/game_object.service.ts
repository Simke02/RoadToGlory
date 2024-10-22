import { Inject, Injectable } from '@nestjs/common';
import { AttackService } from './modules/attack/attack.service';
import { DestroyService } from './modules/destroy/destroy.service';
import { FacilityProductionService } from './modules/facility_production/facility_production.service';
import { MovementService } from './modules/movement/movement.service';
import { ResourceFacilityProductionService } from './modules/resource_facility_production/resource_facility_production.service';
import { UnitProductionService } from './modules/unit_production/unit_production.service';
import { Map } from 'src/common/providers/map/map';
import { Unit } from 'src/common/models/unit/unit.model';
import { BasicFacility } from 'src/common/models/basic_facility.model';
import { PositionStep } from 'src/common/models/position/position_step.model';
import { UpgradeService } from './modules/upgrade/upgrade.service';
import { Upgrade } from 'src/common/models/upgrade/upgrade.model';
import { Position } from 'src/common/models/position/position.model';
import { City } from 'src/common/models/city/city.model';

@Injectable()
export class GameObjectService {
  private attack_service: AttackService;
  private destroy_service: DestroyService;
  private facility_production_service: FacilityProductionService;
  private movement_service: MovementService;
  private resource_facility_production_service: ResourceFacilityProductionService;
  private unit_production_service: UnitProductionService;
  private upgrade_service: UpgradeService;

  //Potencijalni atributi
  private player: string; //Koji player je trenutno na potezu
  private left: boolean; //Da li je levi igrac u pitanju
  private players: string[];

  constructor(@Inject('MAP') private readonly map: Map) {
    this.attack_service = new AttackService(map);
    this.destroy_service = new DestroyService(map);
    this.facility_production_service = new FacilityProductionService(map);
    this.movement_service = new MovementService(map);
    this.resource_facility_production_service = new ResourceFacilityProductionService(map);
    this.unit_production_service = new UnitProductionService(map);
    this.upgrade_service = new UpgradeService();

    this.player = ""; //Pretpostavljamo da sadrzi username playera koji trenutno izvrsava potez
    this.players = [];
    this.left = true;
  }

  //Sta moze da bude izgradjeno na jednom polju
  whatCanBeBuilt(x_coor: number, y_coor: number): {building_names: string[], gold_cost: number[]} {
    if((this.left && y_coor > 0 && this.map.getType(x_coor, y_coor-1) === "facility") 
      || (!this.left && (y_coor + 1) < this.map.getNumberOfColumns() && this.map.getType(x_coor, y_coor+1) === "facility")){
      return {
        building_names: [],
        gold_cost: []
      }
    }
    
    let facilities = {facility_name: [], gold_cost: []}
    if((this.left && (y_coor + 1) < this.map.getNumberOfColumns() && (this.map.getType(x_coor, y_coor + 1) === "" || this.map.getType(x_coor, y_coor + 1) === "unit"))
      || (!this.left && y_coor > 0 && (this.map.getType(x_coor, y_coor - 1) === "" || this.map.getType(x_coor, y_coor - 1) === "unit"))){
      facilities = this.facility_production_service.facilitiesDescription();
    }
    const resource_facilities = this.resource_facility_production_service.resourceFacilitiesDescription();

    const building_names = [...facilities.facility_name, ...resource_facilities.resource_facility_name];
    const gold_cost = [...facilities.gold_cost, ...resource_facilities.gold_cost];

    return {
      building_names,
      gold_cost
    };
  }

  //Gde sve moze da ide jedinica i sta moze da napada i unistava
  unitTurnPossibilities(unit: Unit, /*enemy_units: Unit[], enemy_objects: BasicFacility[]*/): PositionStep[]
    /*{positions: PositionStep[], units_in_range: Unit[], objects_in_range: BasicFacility[]}*/ {
      
      let positions = this.movement_service.whereCanUnitGo(unit);
      let units_in_range = this.attack_service.whatCanUnitAttack(unit, this.player);//enemy_units);
      let objects_in_range = this.destroy_service.whatCanUnitDestroy(unit, this.player);//enemy_objects);

      const everything = [...positions, ...units_in_range, ...objects_in_range];
      return everything;
      //return {positions, units_in_range, objects_in_range};
  }

  //Konkretan napad
  attack(attacker: Unit, defender: Unit): {attacker: Unit, defender: Unit} {
    let result = this.attack_service.attack(attacker, defender);
    if(result.defender.health <= 0 && result.attacker.health > 0)
      result.attacker = this.movement_service.moveAfterAttack(result.attacker, result.defender.x_coor, result.defender.y_coor);
    return result;
  }

  //Konkretni napad na objekat i grad
  destroy(attacker: Unit, object: BasicFacility): {attacker: Unit, object: BasicFacility} {
    let result = this.destroy_service.destroy(attacker, object);
    if(result.object.health <= 0 && result.attacker.health > 0)
      result.attacker = this.movement_service.moveAfterAttack(result.attacker, result.object.x_coor, result.object.y_coor);
    return result;
  }

  //Konkretno kretanje
  //Ideja je da mi u unitTurnPossibilities vratimo klijentu PositionStep i da kada se odluci za kretanje on vrati taj PositionStep
  move(unit: Unit, final_position: PositionStep): Unit {
    let result = this.movement_service.move(unit, final_position);
    return result;
  }

  //Pravljenje jedinice
  //y_coor koji se prima je za jedan veci ili manji od facility, zavisi od toga ko je na potezu
  produceUnit(unit_type: string, unit_name: string, x_coor: number, y_coor: number): Unit {
    /*unit_type: artillery, infantry, tank*/
    /*unit_name: artillery, infantry, tank*/
    return this.unit_production_service.createUnit(unit_type, unit_name, x_coor, y_coor, this.player);
  }

  //Pravljenje objekta
  produceFacility(facility_identificator: string, x_coor: number, y_coor: number): BasicFacility {
      /*facility_identificator: r_farm, r_mine, p_barracks, p_tank_plant, p_artillery_plant*/
    const result = facility_identificator.split('-');

    if(result[0] === 'p') {
      return this.facility_production_service.produceFacility(result[1], x_coor, y_coor, this.player);
    }
    else if(result[0] === 'r') {
      return this.resource_facility_production_service.produceResourceFacility(result[1], x_coor, y_coor, this.player);
    }
  }

  //Postavlja ime trenutnog playera
  nextTurn(player: string, left: boolean){
    this.player = player;
    this.left = left;
  }

  //Nesto kao first turn
  //Treba da napravi city
  createGame(): {first_player: string, first_city: City, second_player: string, second_city: City}{
    //first player
    this.map.setType(12, 2, "city");
    this.map.setOwner(12, 2, this.players[0]);
    const first_city = new City(12, 2);
    this.player = this.players[0];

    //second player
    this.map.setType(12, 22, "city");
    this.map.setOwner(12, 22, this.players[1]);
    const second_city = new City(12, 22);

    return {first_player: this.players[0], first_city, second_player: this.players[1], second_city}
  }

  //Ovako se igrac prijavljuje u game
  addPlayer(player_name: string){
    this.players.push(player_name);
  }

  //Koji svi upgradovi mogu da se izuce
  whatUpgradesExist(): {upgrade_name: string[], gold_cost: number[]} {
    return this.upgrade_service.upgradeDescription();
  }

  //Vraca izuceni upgrade
  researchUpgrade(what_upgrade: string): Upgrade {
    return this.upgrade_service.researchUpgrade(what_upgrade);
  }

  getTerrain(): string[][] {
    return this.map.getTerrain();
  }

  getPosition(x_coor: number, y_coor: number): Position {
    return this.map.getPosition(x_coor, y_coor);
  }
}
