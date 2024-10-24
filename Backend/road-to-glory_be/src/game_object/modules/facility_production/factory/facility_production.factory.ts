import { Inject } from "@nestjs/common";
import { ArtilleryPlant } from "src/common/models/facility/artillery_plant.model";
import { Barracks } from "src/common/models/facility/barracks.model";
import { Facility } from "src/common/models/facility/facility.model";
import { TankPlant } from "src/common/models/facility/tank_plant.model";
import { Maps } from "src/common/providers/map/maps";

export class FacilityProductionFactory{
    facility_name: string[];
    gold_cost: number[];

    constructor(@Inject('MAPS') private readonly maps: Maps){
        this.facility_name = [];
        this.facility_name.push("p-barracks"); //Ovo p stavljamo da bi smo mogli da razlikujemo u funkciji produceFacility iz game_obj
        this.facility_name.push("p-tank_plant");
        this.facility_name.push("p-artillery_plant");

        this.gold_cost = [];
        this.gold_cost.push(25);
        this.gold_cost.push(35);
        this.gold_cost.push(45);
    }

    //Proizvodnja objekta za proizvodnju
    produceFacility(what_facility: string, x_coor: number, y_coor, player: string, room: string): Facility{
        let facility: Facility;

        switch(what_facility) {
            case "barracks":
                facility = new Barracks(x_coor, y_coor);
                break;
            case "tank_plant":
                facility = new TankPlant(x_coor, y_coor);
                break;
            case "artillery_plant":
                facility = new ArtilleryPlant(x_coor, y_coor);
                break;
        }
        this.maps.getMap(room).setOwner(x_coor, y_coor, player);
        this.maps.getMap(room).setType(x_coor, y_coor, "facility");

        return facility;
    }

    //Vracanje opisa za sve proizvodnje koje mogu da se naprave
    facilitiesDescription(): {facility_name: string[], gold_cost: number[]} {
        return {facility_name: this.facility_name, gold_cost: this.gold_cost};
    }
}