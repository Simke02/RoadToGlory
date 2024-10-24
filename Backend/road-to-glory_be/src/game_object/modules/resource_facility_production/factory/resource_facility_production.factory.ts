import { Inject } from "@nestjs/common";
import { Farm } from "src/common/models/resource_facility/farm.model";
import { Mine } from "src/common/models/resource_facility/mine.model";
import { ResourceFacility } from "src/common/models/resource_facility/resource_facility.model";
import { Maps } from "src/common/providers/map/maps";

export class ResourceFacilityProductionFactory{
    resource_facility_name: string[];
    gold_cost: number[];

    constructor(@Inject('MAPS') private readonly maps: Maps) {
        this.resource_facility_name = [];
        this.resource_facility_name.push("r-farm");
        this.resource_facility_name.push("r-mine");

        this.gold_cost = [];
        this.gold_cost.push(10);
        this.gold_cost.push(15);
    }

    //Proizvodnja objekta za proizvodnju
    produceResourceFacility(what_facility: string, x_coor: number, y_coor: number, player: string, room: string): ResourceFacility{
        let resource_facility: ResourceFacility;

        switch(what_facility) {
            case "farm":
                resource_facility = new Farm(x_coor, y_coor);
                break;
            case "mine":
                resource_facility = new Mine(x_coor, y_coor);
                break;
        }
        this.maps.getMap(room).setOwner(x_coor, y_coor, player);
        this.maps.getMap(room).setType(x_coor, y_coor, "resource");

        return resource_facility;
    }

    //Vracanje opisa za sve proizvodnje koje mogu da se naprave
    resourceFacilitiesDescription(): {resource_facility_name: string[], gold_cost: number[]} {
        return {resource_facility_name: this.resource_facility_name, gold_cost: this.gold_cost};
    }
}