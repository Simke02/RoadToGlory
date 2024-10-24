import { Inject, Injectable } from '@nestjs/common';
import { Unit } from 'src/common/models/unit/unit.model';
import { UnitProductionChooser } from './unit_production.chooser';
import { Maps } from 'src/common/providers/map/maps';

@Injectable()
export class UnitProductionService {
    
    private chooser: UnitProductionChooser;
    private id_gen;
    
    constructor(@Inject('MAPS') private readonly maps: Maps) {
        this.chooser = new UnitProductionChooser();
        this.id_gen = 1;
    }

    //Ovo je funkcija koja se poziva kada treba da se kreira neka jedinica
    //Sa klijenta ce kada se u nekoj proizvodnji izabere koja jedinica treba da se pravi
    //Da se posalje tip te jedinice (to je u fabrici zapisano koji tip proizvodi)
    //I ime jedinice (u slucaju da postoje razlicite jedinice istog tipa)
    createUnit(unit_type: string, unit_name: string, x_coor: number, y_coor: number, player: string, room: string): Unit {
        let unit_production = this.chooser.chooseUnitType(unit_type);
        const unit = unit_production.produceUnit(unit_name, x_coor, y_coor, this.id_gen++);
        this.maps.getMap(room).setOwner(x_coor, y_coor, player);
        this.maps.getMap(room).setType(x_coor, y_coor, "unit");
        return unit;
    }
}
