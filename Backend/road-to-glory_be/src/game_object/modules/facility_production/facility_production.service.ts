import { Inject, Injectable } from '@nestjs/common';
import { FacilityProductionFactory } from './factory/facility_production.factory';
import { Facility } from 'src/common/models/facility/facility.model';
import { Maps } from 'src/common/providers/map/maps';

@Injectable()
export class FacilityProductionService {

    private production_factory: FacilityProductionFactory;
    
    constructor(@Inject('MAPS') private readonly maps: Maps){
        this.production_factory = new FacilityProductionFactory(maps);
    }

    //Proizvodnja objekta za proizvodnju
    produceFacility(what_facility: string, x_coor: number, y_coor: number, player: string, room: string): Facility{
        return this.production_factory.produceFacility(what_facility, x_coor, y_coor, player, room);
    }

    //Vracanje opisa za sve proizvodnje koje mogu da se naprave
    facilitiesDescription(): {facility_name: string[], gold_cost: number[]} {
        return this.production_factory.facilitiesDescription();
    }
}
