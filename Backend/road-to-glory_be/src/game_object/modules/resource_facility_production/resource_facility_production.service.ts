import { Injectable } from '@nestjs/common';
import { ResourceFacilityProductionFactory } from './factory/resource_facility_production.factory';
import { ResourceFacility } from 'src/common/models/resource_facility/resource_facility.model';

@Injectable()
export class ResourceFacilityProductionService {
    private production_factory: ResourceFacilityProductionFactory;
    
    constructor(){
        this.production_factory = new ResourceFacilityProductionFactory();
    }

    //Proizvodnja objekta za skupljanje resursa
    produceResourceFacility(what_facility: string, x_coor: number, y_coor: number): ResourceFacility{
        return this.production_factory.produceResourceFacility(what_facility, x_coor, y_coor);
    }

    //Vracanje opisa za sve objekte za skupljanje resursa koje mogu da se naprave
    resourceFacilitiesDescription(): {resource_facility_name: string[], gold_cost: number[]} {
        return this.production_factory.resourceFacilitiesDescription();
    }
}
