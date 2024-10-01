import { Fire } from "src/common/models/upgrade/fire.model";
import { Gas } from "src/common/models/upgrade/gas.model";
import { Nuclear } from "src/common/models/upgrade/nuclear.model";
import { Upgrade } from "src/common/models/upgrade/upgrade.model";

export class UpgradeFactory {
    private upgrade_name: string[];
    private gold_cost: number[];
    private upgrades: Record<string, Upgrade> = {
        fire: new Fire(),
        gas: new Gas(),
        nuclear: new Nuclear()
    };

    constructor() {
        this.upgrade_name = [];
        this.upgrade_name.push("gas");
        this.upgrade_name.push("fire");
        this.upgrade_name.push("nuclear");
        
        this.gold_cost = [];
        this.gold_cost.push(50);        
        this.gold_cost.push(75);    
        this.gold_cost.push(100);
    }

    //Treba da vrati upgrade koji je korisnik izucio
    researchUpgrade(what_upgrade: string): Upgrade {
        return this.upgrades[what_upgrade];
    }

    //Vraca sve upgradove koji postoje
    upgradeDescription(): {upgrade_name: string[], gold_cost: number[]} {
        return {upgrade_name: this.upgrade_name, gold_cost: this.gold_cost};
    }
}