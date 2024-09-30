import { Module } from '@nestjs/common';
import { ResourceFacilityProductionService } from './resource_facility_production.service';
import { ResourceFacilityProductionController } from './resource_facility_production.controller';

@Module({
  controllers: [ResourceFacilityProductionController],
  providers: [ResourceFacilityProductionService],
})
export class ResourceFacilityProductionModule {}
