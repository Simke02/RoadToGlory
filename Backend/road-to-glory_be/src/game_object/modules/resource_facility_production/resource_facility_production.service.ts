import { Inject, Injectable } from '@nestjs/common';
import { ResourceFacilityProductionFactory } from './factory/resource_facility_production.factory';
import { ResourceFacility } from 'src/common/models/resource_facility/resource_facility.model';
import { Maps } from 'src/common/providers/map/maps';

@Injectable()
export class ResourceFacilityProductionService {
    private production_factory: ResourceFacilityProductionFactory;
    
    constructor(@Inject('MAPS') private readonly maps: Maps){
        this.production_factory = new ResourceFacilityProductionFactory(maps);
    }

    //Proizvodnja objekta za skupljanje resursa
    produceResourceFacility(what_facility: string, x_coor: number, y_coor: number, player: string, room: string): ResourceFacility{
        return this.production_factory.produceResourceFacility(what_facility, x_coor, y_coor, player, room);
    }

    //Vracanje opisa za sve objekte za skupljanje resursa koje mogu da se naprave
    resourceFacilitiesDescription(): {resource_facility_name: string[], gold_cost: number[]} {
        return this.production_factory.resourceFacilitiesDescription();
    }
}
