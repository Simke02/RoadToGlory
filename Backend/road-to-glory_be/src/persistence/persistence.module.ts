import { Module } from '@nestjs/common';
import { PersistenceService } from './persistence.service';
import { PersistenceController } from './persistence.controller';
import { Stats } from './entities/stats.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports:[TypeOrmModule.forFeature([Stats])],
  controllers: [PersistenceController],
  providers: [PersistenceService],
})
export class PersistenceModule {}
