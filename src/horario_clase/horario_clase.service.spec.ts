import { Test, TestingModule } from '@nestjs/testing';
import { HorarioClaseService } from './horario_clase.service';

describe('HorarioClaseService', () => {
  let service: HorarioClaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HorarioClaseService],
    }).compile();

    service = module.get<HorarioClaseService>(HorarioClaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
