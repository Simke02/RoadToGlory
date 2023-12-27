import { Test, TestingModule } from '@nestjs/testing';
import { ArmyController } from './army.controller';
import { ArmyService } from './army.service';

describe('ArmyController', () => {
  let controller: ArmyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArmyController],
      providers: [ArmyService],
    }).compile();

    controller = module.get<ArmyController>(ArmyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
