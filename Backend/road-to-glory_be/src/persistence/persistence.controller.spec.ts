import { Test, TestingModule } from '@nestjs/testing';
import { PersistenceController } from './persistence.controller';
import { PersistenceService } from './persistence.service';

describe('PersistenceController', () => {
  let controller: PersistenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersistenceController],
      providers: [PersistenceService],
    }).compile();

    controller = module.get<PersistenceController>(PersistenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
