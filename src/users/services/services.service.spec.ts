import { Test, TestingModule } from '@nestjs/testing';
import { ServicesService } from './services.service';
// import { Repository } from 'typeorm';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { User } from 'src/TypeORM/entities/User';

describe('ServicesService', () => {
  let service: ServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicesService],
    }).compile();

    service = module.get<ServicesService>(ServicesService);
    // userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
