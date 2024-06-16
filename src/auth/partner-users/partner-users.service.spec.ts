import { Test, TestingModule } from '@nestjs/testing';
import { PartnerUsersService } from './partner-users.service';

describe('PartnerUsersService', () => {
  let service: PartnerUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartnerUsersService],
    }).compile();

    service = module.get<PartnerUsersService>(PartnerUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
