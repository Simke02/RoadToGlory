import { Injectable } from '@nestjs/common';
import { UpgradeFactory } from './factory/upgrade.factory';
import { Upgrade } from 'src/common/models/upgrade/upgrade.model';

@Injectable()
export class UpgradeService {
    private upgrade_factory: UpgradeFactory;

    constructor() {
        this.upgrade_factory = new UpgradeFactory();
    }

    //Treba da vrati upgrade koji je korisnik izucio
    researchUpgrade(what_upgrade: string): Upgrade {
        return this.upgrade_factory.researchUpgrade(what_upgrade);
    }
    
    //Vraca sve upgradove koji postoje
    upgradeDescription(): {upgrade_name: string[], gold_cost: number[]} {
        return this.upgrade_factory.upgradeDescription();
    }
}
