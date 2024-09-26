import { AttackStrategy } from "./strategies/attack.strategy";
import { ForestHillsStrategy } from "./strategies/forest_hills.strategy";
import { ForestLakeStrategy } from "./strategies/forest_lake.strategy";
import { HillLakeStrategy } from "./strategies/hills_lake.strategy";
import { PlainsForestStrategy } from "./strategies/plains_forest.strategy";
import { PlainsHillsStrategy } from "./strategies/plains_hills.strategy";
import { PlainLakeStrategy } from "./strategies/plains_lake.strategy";
import { SameSameStrategy } from "./strategies/same_same.strategy";

export class AttackFactory{
    private attack_strategies: Record<string, AttackStrategy> = {
        same_same: new SameSameStrategy(),
        plains_lake: new PlainLakeStrategy(),
        plains_hills: new PlainsHillsStrategy(),
        plains_forest: new PlainsForestStrategy(),
        hills_lake: new HillLakeStrategy(),
        forest_lake: new ForestLakeStrategy(),
        forest_hills: new ForestHillsStrategy()

        //dodaj strategies koje nedostaju
    };

    createStrategy(terrainType: string): AttackStrategy{
        return this.attack_strategies[terrainType];
    }
}