import { Upgrade } from "./upgrade.model";

export class Fire implements Upgrade {
    name: string;
    cost: number;

    constructor() {
        this.name = "fire";
        this.cost = 25;
    }
}