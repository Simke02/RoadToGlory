import { Controller } from '@nestjs/common';
import { AttackService } from './attack.service';

@Controller('attack')
export class AttackController {
  constructor(private readonly attackService: AttackService) {}
}
