import { Controller } from '@nestjs/common';
import { UnitProductionService } from './unit_production.service';

@Controller()
export class UnitProductionController {
  constructor(private readonly unitProductionService: UnitProductionService) {}
}
