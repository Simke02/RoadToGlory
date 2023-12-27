import { Test, TestingModule } from '@nestjs/testing';
import { GameObjectController } from './game_object.controller';
import { GameObjectService } from './game_object.service';

describe('GameObjectController', () => {
  let controller: GameObjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameObjectController],
      providers: [GameObjectService],
    }).compile();

    controller = module.get<GameObjectController>(GameObjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
