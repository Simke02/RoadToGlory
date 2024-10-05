import { Inject, Injectable } from '@nestjs/common';
import { ResourceFacilityProductionFactory } from './factory/resource_facility_production.factory';
import { ResourceFacility } from 'src/common/models/resource_facility/resource_facility.model';
import { Map } from 'src/common/providers/map/map';

@Injectable()
export class ResourceFacilityProductionService {
    private production_factory: ResourceFacilityProductionFactory;
    
    constructor(@Inject('MAP') private readonly map: Map){
        this.production_factory = new ResourceFacilityProductionFactory(map);
    }

    //Proizvodnja objekta za skupljanje resursa
    produceResourceFacility(what_facility: string, x_coor: number, y_coor: number, player: string): ResourceFacility{
        return this.production_factory.produceResourceFacility(what_facility, x_coor, y_coor, player);
    }

    //Vracanje opisa za sve objekte za skupljanje resursa koje mogu da se naprave
    resourceFacilitiesDescription(): {resource_facility_name: string[], gold_cost: number[]} {
        return this.production_factory.resourceFacilitiesDescription();
    }
}
