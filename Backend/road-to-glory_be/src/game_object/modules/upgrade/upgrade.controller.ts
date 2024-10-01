import { Controller } from '@nestjs/common';
import { UpgradeService } from './upgrade.service';

@Controller()
export class UpgradeController {
  constructor(private readonly upgradeService: UpgradeService) {}
}
