import { Test, TestingModule } from '@nestjs/testing';
import { FamiliarService } from './familiar.service';

describe('FamiliarService', () => {
  let service: FamiliarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FamiliarService],
    }).compile();

    service = module.get<FamiliarService>(FamiliarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
