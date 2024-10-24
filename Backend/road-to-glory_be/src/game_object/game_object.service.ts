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
import { Maps } from 'src/common/providers/map/maps';

@Injectable()
export class GameObjectService {
  private attack_service: AttackService;
  private destroy_service: DestroyService;
  private facility_production_service: FacilityProductionService;
  private movement_service: MovementService;
  private resource_facility_production_service: ResourceFacilityProductionService;
  private unit_production_service: UnitProductionService;
  private upgrade_service: UpgradeService;

  private player: {[room: string]: string} = {};//Koji player je trenutno na potezu
  private left: {[room: string]: boolean } = {}; //Da li je levi igrac u pitanju
  private players: {[room: string]: string[] } = {};

  constructor(@Inject('MAPS') private readonly maps: Maps) {
    this.attack_service = new AttackService(maps);
    this.destroy_service = new DestroyService(maps);
    this.facility_production_service = new FacilityProductionService(maps);
    this.movement_service = new MovementService(maps);
    this.resource_facility_production_service = new ResourceFacilityProductionService(maps);
    this.unit_production_service = new UnitProductionService(maps);
    this.upgrade_service = new UpgradeService();
  }

  //Sta moze da bude izgradjeno na jednom polju
  whatCanBeBuilt(x_coor: number, y_coor: number, room: string): {building_names: string[], gold_cost: number[]} {
    if((this.left && y_coor > 0 && this.maps.getMap(room).getType(x_coor, y_coor-1) === "facility") 
      || (!this.left && (y_coor + 1) < this.maps.getMap(room).getNumberOfColumns() && this.maps.getMap(room).getType(x_coor, y_coor+1) === "facility")){
      return {
        building_names: [],
        gold_cost: []
      }
    }
    
    let facilities = {facility_name: [], gold_cost: []}
    if((this.left && (y_coor + 1) < this.maps.getMap(room).getNumberOfColumns() && (this.maps.getMap(room).getType(x_coor, y_coor + 1) === "" || this.maps.getMap(room).getType(x_coor, y_coor + 1) === "unit"))
      || (!this.left && y_coor > 0 && (this.maps.getMap(room).getType(x_coor, y_coor - 1) === "" || this.maps.getMap(room).getType(x_coor, y_coor - 1) === "unit"))){
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
  unitTurnPossibilities(unit: Unit, room: string): PositionStep[] {
      
      let positions = this.movement_service.whereCanUnitGo(unit, room);
      let units_in_range = this.attack_service.whatCanUnitAttack(unit, this.player[room], room);
      let objects_in_range = this.destroy_service.whatCanUnitDestroy(unit, this.player[room], room);

      const everything = [...positions, ...units_in_range, ...objects_in_range];
      return everything;
  }

  //Konkretan napad
  attack(attacker: Unit, defender: Unit, room: string): {attacker: Unit, defender: Unit} {
    let result = this.attack_service.attack(attacker, defender, room);
    if(result.defender.health <= 0 && result.attacker.health > 0 && result.attacker.range == 1)
      result.attacker = this.movement_service.moveAfterAttack(result.attacker, result.defender.x_coor, result.defender.y_coor, room);
    return result;
  }

  //Konkretni napad na objekat i grad
  destroy(attacker: Unit, object: BasicFacility, room: string): {attacker: Unit, object: BasicFacility} {
    let result = this.destroy_service.destroy(attacker, object, room);
    if(result.object.health <= 0 && result.attacker.health > 0 && result.attacker.range == 1)
      result.attacker = this.movement_service.moveAfterAttack(result.attacker, result.object.x_coor, result.object.y_coor, room);
    return result;
  }

  //Konkretno kretanje
  //Ideja je da mi u unitTurnPossibilities vratimo klijentu PositionStep i da kada se odluci za kretanje on vrati taj PositionStep
  move(unit: Unit, final_position: PositionStep, room: string): Unit {
    let result = this.movement_service.move(unit, final_position, room);
    return result;
  }

  //Pravljenje jedinice
  //y_coor koji se prima je za jedan veci ili manji od facility, zavisi od toga ko je na potezu
  produceUnit(unit_type: string, unit_name: string, x_coor: number, y_coor: number, room: string): Unit {
    /*unit_type: artillery, infantry, tank*/
    /*unit_name: artillery, infantry, tank*/
    return this.unit_production_service.createUnit(unit_type, unit_name, x_coor, y_coor, this.player[room], room);
  }

  //Pravljenje objekta
  produceFacility(facility_identificator: string, x_coor: number, y_coor: number, room: string): BasicFacility {
      /*facility_identificator: r_farm, r_mine, p_barracks, p_tank_plant, p_artillery_plant*/
    const result = facility_identificator.split('-');

    if(result[0] === 'p') {
      return this.facility_production_service.produceFacility(result[1], x_coor, y_coor, this.player[room], room);
    }
    else if(result[0] === 'r') {
      return this.resource_facility_production_service.produceResourceFacility(result[1], x_coor, y_coor, this.player[room], room);
    }
  }

  //Postavlja ime trenutnog playera
  nextTurn(player: string, left: boolean, room: string){
    this.player[room] = player;
    this.left[room] = left;
  }

  //Nesto kao first turn
  //Treba da napravi city
  createGame(room: string): {first_player: string, first_city: City, second_player: string, second_city: City}{

    if(!this.maps.doesMapExist(room)){
      this.maps.createMap(room);
    }

    //first player
    this.maps.getMap(room).setType(12, 2, "city");
    this.maps.getMap(room).setOwner(12, 2, this.players[room][0]);
    const first_city = new City(12, 2);
    this.player[room] = this.players[room][0];

    //second player
    this.maps.getMap(room).setType(12, 22, "city");
    this.maps.getMap(room).setOwner(12, 22, this.players[room][1]);
    const second_city = new City(12, 22);

    return {first_player: this.players[room][0], first_city, second_player: this.players[room][1], second_city}
  }

  //Ovako se igrac prijavljuje u game
  addPlayer(player_name: string, room: string){
    if(!this.players.hasOwnProperty(room))
      this.players[room] = [];
    this.players[room].push(player_name);
  }

  //Koji svi upgradovi mogu da se izuce
  whatUpgradesExist(): {upgrade_name: string[], gold_cost: number[]} {
    return this.upgrade_service.upgradeDescription();
  }

  //Vraca izuceni upgrade
  researchUpgrade(what_upgrade: string): Upgrade {
    return this.upgrade_service.researchUpgrade(what_upgrade);
  }

  getTerrain(room: string): string[][] {
    return this.maps.getMap(room).getTerrain();
  }

  getPosition(x_coor: number, y_coor: number, room: string): Position {
    return this.maps.getMap(room).getPosition(x_coor, y_coor);
  }

  //Unistavanje podataka vezanih za game pri zavrsetku istog
  endGame(room: string) {
    delete this.players[room];
    delete this.player[room];
    delete this.left[room];
    this.maps.deleteMap(room);
  }
}
