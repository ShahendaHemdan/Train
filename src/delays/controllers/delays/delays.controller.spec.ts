import { Test, TestingModule } from '@nestjs/testing';
import { DelaysController } from './delays.controller';

describe('DelaysController', () => {
  let controller: DelaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DelaysController],
    }).compile();

    controller = module.get<DelaysController>(DelaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
