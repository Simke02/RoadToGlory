import { Inject, Injectable } from '@nestjs/common';
import { FacilityProductionFactory } from './factory/facility_production.factory';
import { Facility } from 'src/common/models/facility/facility.model';
import { Map } from 'src/common/providers/map/map';

@Injectable()
export class FacilityProductionService {

    private production_factory: FacilityProductionFactory;
    
    constructor(@Inject('MAP') private readonly map: Map){
        this.production_factory = new FacilityProductionFactory(map);
    }

    //Proizvodnja objekta za proizvodnju
    produceFacility(what_facility: string, x_coor: number, y_coor: number, player: string): Facility{
        return this.production_factory.produceFacility(what_facility, x_coor, y_coor, player);
    }

    //Vracanje opisa za sve proizvodnje koje mogu da se naprave
    facilitiesDescription(): {facility_name: string[], gold_cost: number[]} {
        return this.production_factory.facilitiesDescription();
    }
}
