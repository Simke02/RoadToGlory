import { Module } from '@nestjs/common';
import { PersistenceService } from './persistence.service';
import { PersistenceController } from './persistence.controller';


@Module({
  controllers: [PersistenceController],
  providers: [PersistenceService],
})
export class PersistenceModule {}
