import { ArtilleryPlant } from "src/common/models/facility/artillery_plant.model";
import { Barracks } from "src/common/models/facility/barracks.model";
import { Facility } from "src/common/models/facility/facility.model";
import { TankPlant } from "src/common/models/facility/tank_plant.model";

export class FacilityProductionFactory{
    facility_name: string[];
    gold_cost: number[];

    constructor(){
        this.facility_name = [];
        this.facility_name.push("p_barracks"); //Ovo p stavljamo da bi smo mogli da razlikujemo u funkciji produceFacility iz game_obj
        this.facility_name.push("p_tank_plant");
        this.facility_name.push("p_artillery_plant");

        this.gold_cost = [];
        this.gold_cost.push(25);
        this.gold_cost.push(35);
        this.gold_cost.push(45);
    }

    //Proizvodnja objekta za proizvodnju
    produceFacility(what_facility: string, x_coor: number, y_coor): Facility{
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

        return facility;
    }

    //Vracanje opisa za sve proizvodnje koje mogu da se naprave
    facilitiesDescription(): {facility_name: string[], gold_cost: number[]} {
        return {facility_name: this.facility_name, gold_cost: this.gold_cost};
    }
}