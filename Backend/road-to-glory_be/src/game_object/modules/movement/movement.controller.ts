import { Controller } from '@nestjs/common';
import { MovementService } from './movement.service';

@Controller()
export class MovementController {
  constructor(private readonly movementService: MovementService) {}
}
