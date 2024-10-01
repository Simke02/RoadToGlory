import { Upgrade } from "./upgrade.model";

export class Gas implements Upgrade {
    name: string;
    cost: number;

    constructor() {
        this.name = "gas";
        this.cost = 20;
    }
}