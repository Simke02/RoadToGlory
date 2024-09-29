import { ArtilleryPlant } from "src/common/models/facility/artillery_plant.model";
import { Barracks } from "src/common/models/facility/barracks.model";
import { Facility } from "src/common/models/facility/facility.model";
import { TankPlant } from "src/common/models/facility/tank_plant.model";

export class FacilityProductionFactory{
    facility_name: string[];
    iron_cost: number[];

    constructor(){
        this.facility_name = [];
        this.facility_name.push("barracks");
        this.facility_name.push("tank_plant");
        this.facility_name.push("artillery_plant");

        this.iron_cost = [];
        this.iron_cost.push(25);
        this.iron_cost.push(35);
        this.iron_cost.push(45);
    }

    //Proizvodnja objekta za proizvodnju
    produceFacility(what_facility: string): Facility{
        let facility: Facility;

        switch(what_facility) {
            case "barracks":
                facility = new Barracks();
                break;
            case "tank_plant":
                facility = new TankPlant();
                break;
            case "artillery_plant":
                facility = new ArtilleryPlant();
                break;
        }

        return facility;
    }

    //Vracanje opisa za sve proizvodnje koje mogu da se naprave
    facilitiesDescription(): {facility_name: string[], iron_cost: number[]} {
        return {facility_name: this.facility_name, iron_cost: this.iron_cost};
    }
}