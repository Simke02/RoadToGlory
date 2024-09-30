import { Module } from '@nestjs/common';
import { DestroyService } from './destroy.service';
import { DestroyController } from './destroy.controller';

@Module({
  controllers: [DestroyController],
  providers: [DestroyService],
})
export class DestroyModule {}
