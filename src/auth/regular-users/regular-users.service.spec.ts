import { Test, TestingModule } from '@nestjs/testing';
import { RegularUsersService } from './regular-users.service';

describe('RegularUsersService', () => {
  let service: RegularUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegularUsersService],
    }).compile();

    service = module.get<RegularUsersService>(RegularUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
