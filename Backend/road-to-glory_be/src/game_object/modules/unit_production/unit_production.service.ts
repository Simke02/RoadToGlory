import { Injectable } from '@nestjs/common';
import { Unit } from 'src/common/models/unit/unit.model';
import { UnitProductionChooser } from './unit_production.chooser';

@Injectable()
export class UnitProductionService {
    
    chooser: UnitProductionChooser;
    
    constructor() {
        this.chooser = new UnitProductionChooser();
    }

    //Ovo je funkcija koja se poziva kada treba da se kreira neka jedinica
    //Sa klijenta ce kada se u nekoj proizvodnji izabere koja jedinica treba da se pravi
    //Da se posalje tip te jedinice (to je u fabrici zapisano koji tip proizvodi)
    //I ime jedinice (u slucaju da postoje razlicite jedinice istog tipa)
    createUnit(unit_type: string, unit_name: string): Unit {
        let unit_production = this.chooser.chooseUnitType(unit_type);
        return unit_production.produceUnit(unit_name);
    }
}
