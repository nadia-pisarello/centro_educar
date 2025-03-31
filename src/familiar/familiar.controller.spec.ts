import { Test, TestingModule } from '@nestjs/testing';
import { FamiliarController } from './familiar.controller';
import { FamiliarService } from './familiar.service';

describe('FamiliarController', () => {
  let controller: FamiliarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamiliarController],
      providers: [FamiliarService],
    }).compile();

    controller = module.get<FamiliarController>(FamiliarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
