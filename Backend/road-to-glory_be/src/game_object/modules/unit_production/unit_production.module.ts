import { Module } from '@nestjs/common';
import { UnitProductionService } from './unit_production.service';
import { UnitProductionController } from './unit_production.controller';

@Module({
  controllers: [UnitProductionController],
  providers: [UnitProductionService],
})
export class UnitProductionModule {}
