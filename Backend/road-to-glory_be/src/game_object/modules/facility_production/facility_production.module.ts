import { Module } from '@nestjs/common';
import { FacilityProductionService } from './facility_production.service';
import { FacilityProductionController } from './facility_production.controller';

@Module({
  controllers: [FacilityProductionController],
  providers: [FacilityProductionService],
})
export class FacilityProductionModule {}
