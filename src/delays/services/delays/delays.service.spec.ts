import { Test, TestingModule } from '@nestjs/testing';
import { DelaysService } from './delays.service';

describe('DelaysService', () => {
  let service: DelaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DelaysService],
    }).compile();

    service = module.get<DelaysService>(DelaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
