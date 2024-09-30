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

@Injectable()
export class GameObjectService {
  private attack_service: AttackService;
  private destroy_service: DestroyService;
  private facility_production_service: FacilityProductionService;
  private movement_service: MovementService;
  private resource_facility_production_service: ResourceFacilityProductionService;
  private unit_production_service: UnitProductionService;

  //Potencijalni atributi
  private player: string;

  constructor(@Inject('MAP') private readonly map: Map) {
    this.attack_service = new AttackService(map);
    this.destroy_service = new DestroyService(map);
    this.facility_production_service = new FacilityProductionService();
    this.movement_service = new MovementService(map);
    this.resource_facility_production_service = new ResourceFacilityProductionService();
    this.unit_production_service = new UnitProductionService();

    this.player = "";
  }

  //Sta moze da bude izgradjeno na jednom polju
  whatCanBeBuilt(): {facility_name: string[], iron_cost: number[]} {
    return this.facility_production_service.facilitiesDescription();
  }

  //Gde sve moze da ide jedinica i sta moze da napada i unistava
  unitTurnPossibilities(unit: Unit, enemy_units: Unit[], enemy_objects: BasicFacility[]): 
    {positions: PositionStep[], units_in_range: Unit[], objects_in_range: BasicFacility[]} {
      
      let positions = this.movement_service.whereCanUnitGo(unit);
      let units_in_range = this.attack_service.whatCanUnitAttack(unit, enemy_units);
      let objects_in_range = this.destroy_service.whatCanUnitDestroy(unit, enemy_objects);
      return {positions, units_in_range, objects_in_range};
  }

  //Konkretan napad
  attack(attacker: Unit, defender: Unit): {attacker: Unit, defender: Unit} {
    let result = this.attack_service.attack(attacker, defender);
    result.attacker.finished_turn = true;
    return result;
  }

  //Konkretni napad na objekat
  destroy(attacker: Unit, object: BasicFacility): {attacker: Unit, object: BasicFacility} {
    let result = this.destroy_service.destroy(attacker, object);
    result.attacker.finished_turn = true;
    return result;
  }

  //Konkretno kretanje
  //Ideja je da mi u unitTurnPossibilities vratimo klijentu PositionStep i da kada se odluci za kretanje on vrati taj PositionStep
  move(unit: Unit, final_position: PositionStep): Unit {
    let result = this.movement_service.move(unit, final_position);
    if(result.steps_left == 0)
      result.finished_turn = true;
    return result;
  }

  //Pravljenje jedinice
  //Moras da vidis gde ce da se napravi jedinica
  produceUnit(unit_type: string, unit_name: string): Unit {
    return this.unit_production_service.createUnit(unit_type, unit_name);
  }

  //Pravljenje objekta
  produceFacility(facility_type: string, facility_name: string, x_coor: number, y_coor: number): BasicFacility {
    if(facility_type == "production") {
      return this.facility_production_service.produceFacility(facility_name, x_coor, y_coor);
    }
    else if(facility_type == "resources") {
      return this.resource_facility_production_service.produceResourceFacility(facility_name, x_coor, y_coor);
    }
  }

  //Treba mi SignalR za to
  nextTurn(){

  }
}
