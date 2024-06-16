import { Test, TestingModule } from '@nestjs/testing';
import { RegularUsersController } from './regular-users.controller';

describe('RegularUsersController', () => {
  let controller: RegularUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegularUsersController],
    }).compile();

    controller = module.get<RegularUsersController>(RegularUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
