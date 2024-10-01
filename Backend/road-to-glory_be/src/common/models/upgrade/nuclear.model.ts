import { Upgrade } from "./upgrade.model";

export class Nuclear implements Upgrade {
    name: string;
    cost: number;

    constructor() {
        this.name = "nuclear";
        this.cost = 30;
    }
}