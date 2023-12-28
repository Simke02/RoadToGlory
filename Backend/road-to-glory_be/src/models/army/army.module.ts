import { Module } from '@nestjs/common';
import { ArmyService } from './army.service';
import { ArmyController } from './army.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Army } from './entities/army.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Army])],
  controllers: [ArmyController],
  providers: [ArmyService],
})
export class ArmyModule {}
