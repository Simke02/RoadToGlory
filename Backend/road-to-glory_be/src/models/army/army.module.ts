import { Module } from '@nestjs/common';
import { ArmyService } from './army.service';
import { ArmyController } from './army.controller';

@Module({
  controllers: [ArmyController],
  providers: [ArmyService],
})
export class ArmyModule {}
