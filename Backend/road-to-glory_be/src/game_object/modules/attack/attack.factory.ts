import { AttackStrategy } from "./strategies/attack.strategy";
import { ForestHillsAttack } from "./strategies/forest_hills.attack";
import { ForestLakeAttack } from "./strategies/forest_lake.attack";
import { ForestPlainsAttack } from "./strategies/forest_plains.attack";
import { HillsForestAttack } from "./strategies/hills_forest.attack";
import { HillsLakeAttack } from "./strategies/hills_lake.attack";
import { HillsPlainsAttack } from "./strategies/hills_plains.attack";
import { LakeForestAttack } from "./strategies/lake_forest.attack";
import { LakeHillsAttack } from "./strategies/lake_hills.attack";
import { LakePlainsAttack } from "./strategies/lake_plains.attack";
import { PlainsForestAttack } from "./strategies/plains_forest.attack";
import { PlainsHillsAttack } from "./strategies/plains_hills.attack";
import { PlainLakeAttack } from "./strategies/plains_lake.attack";
import { RangedAttack } from "./strategies/ranged.attack";
import { SameSameAttack } from "./strategies/same_same.attack";

export class AttackFactory{
    private attack_strategies: Record<string, AttackStrategy> = {
        same_same: new SameSameAttack(),
        plains_lake: new PlainLakeAttack(),
        plains_hills: new PlainsHillsAttack(),
        plains_forest: new PlainsForestAttack(),
        hills_forest: new HillsForestAttack(),
        hills_lake: new HillsLakeAttack(),
        hills_plains: new HillsPlainsAttack(),
        forest_lake: new ForestLakeAttack(),
        forest_hills: new ForestHillsAttack(),
        forest_plains: new ForestPlainsAttack(),
        lake_forest: new LakeForestAttack(),
        lake_hills: new LakeHillsAttack(),
        lake_plains: new LakePlainsAttack(),
        ranged: new RangedAttack()
    };

    createAttack(strategy_type: string): AttackStrategy{
        return this.attack_strategies[strategy_type];
    }
}