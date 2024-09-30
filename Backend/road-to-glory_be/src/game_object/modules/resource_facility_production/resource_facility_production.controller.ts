import { Controller } from '@nestjs/common';
import { ResourceFacilityProductionService } from './resource_facility_production.service';

@Controller()
export class ResourceFacilityProductionController {
  constructor(private readonly resourceFacilityProductionService: ResourceFacilityProductionService) {}
}
