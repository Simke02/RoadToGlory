import { ForestMovement } from "./strategies/forest.movement";
import { HillsMovement } from "./strategies/hills.movement";
import { LakeMovement } from "./strategies/lake.movement";
import { MovementStrategy } from "./strategies/movement.strategy";
import { PlainsMovement } from "./strategies/plains.movement";

export class MovementFactory{
    private movement_strategies: Record<string, MovementStrategy> = {
        forest: new ForestMovement(),
        hills: new HillsMovement(),
        lake: new LakeMovement(),
        plains: new PlainsMovement()
    };

    createMovement(terrainType: string): MovementStrategy{
        return this.movement_strategies[terrainType];
    }
}