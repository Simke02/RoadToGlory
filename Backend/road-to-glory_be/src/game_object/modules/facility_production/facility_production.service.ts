import { Injectable } from '@nestjs/common';
import { FacilityProductionFactory } from './factory/facility_production.factory';
import { Facility } from 'src/common/models/facility/facility.model';

@Injectable()
export class FacilityProductionService {

    private production_factory: FacilityProductionFactory;
    
    constructor(){
        this.production_factory = new FacilityProductionFactory();
    }

    //Proizvodnja objekta za proizvodnju
    produceFacility(what_facility: string, x_coor: number, y_coor: number): Facility{
        return this.production_factory.produceFacility(what_facility, x_coor, y_coor);
    }

    //Vracanje opisa za sve proizvodnje koje mogu da se naprave
    facilitiesDescription(): {facility_name: string[], iron_cost: number[]} {
        return this.production_factory.facilitiesDescription();
    }
}
