import { Module } from '@nestjs/common';
import { GameObjectService } from './game_object.service';
import { GameObjectController } from './game_object.controller';
import { AttackModule } from './modules/attack/attack.module';
import { MovementModule } from './modules/movement/movement.module';
import { FacilityProductionModule } from './modules/facility_production/facility_production.module';
import { UnitProductionModule } from './modules/unit_production/unit_production.module';
import { ResourceFacilityProductionModule } from './modules/resource_facility_production/resource_facility_production.module';
import { DestroyModule } from './modules/destroy/destroy.module';

@Module({
  controllers: [GameObjectController],
  providers: [GameObjectService],
  imports: [AttackModule, MovementModule, FacilityProductionModule, UnitProductionModule, ResourceFacilityProductionModule, DestroyModule],
})
export class GameObjectModule {}
