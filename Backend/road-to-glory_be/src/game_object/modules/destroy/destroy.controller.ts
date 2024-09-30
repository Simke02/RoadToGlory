import { Controller } from '@nestjs/common';
import { DestroyService } from './destroy.service';

@Controller()
export class DestroyController {
  constructor(private readonly destroyService: DestroyService) {}
}
