import { Inject, Injectable } from '@nestjs/common';
import { Unit } from 'src/common/models/unit/unit.model';
import { UnitProductionChooser } from './unit_production.chooser';
import { Map } from 'src/common/providers/map/map';

@Injectable()
export class UnitProductionService {
    
    private chooser: UnitProductionChooser;
    
    constructor(@Inject('MAP') private readonly map: Map) {
        this.chooser = new UnitProductionChooser();
    }

    //Ovo je funkcija koja se poziva kada treba da se kreira neka jedinica
    //Sa klijenta ce kada se u nekoj proizvodnji izabere koja jedinica treba da se pravi
    //Da se posalje tip te jedinice (to je u fabrici zapisano koji tip proizvodi)
    //I ime jedinice (u slucaju da postoje razlicite jedinice istog tipa)
    createUnit(unit_type: string, unit_name: string, x_coor: number, y_coor: number, player: string): Unit {
        let unit_production = this.chooser.chooseUnitType(unit_type);
        const unit = unit_production.produceUnit(unit_name, x_coor, y_coor);
        this.map.setOwner(x_coor, y_coor, player);
        this.map.setType(x_coor, y_coor, "unit");
        return unit;
    }
}
