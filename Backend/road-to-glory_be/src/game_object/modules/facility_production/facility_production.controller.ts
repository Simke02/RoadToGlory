import { Controller } from '@nestjs/common';
import { FacilityProductionService } from './facility_production.service';

@Controller()
export class FacilityProductionController {
  constructor(private readonly facilityProductionService: FacilityProductionService) {}
}
