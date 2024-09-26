import { Module } from '@nestjs/common';
import { AttackService } from './attack.service';
import { AttackController } from './attack.controller';

@Module({
  controllers: [AttackController],
  providers: [AttackService],
})
export class AttackModule {}
