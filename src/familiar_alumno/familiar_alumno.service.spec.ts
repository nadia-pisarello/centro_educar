import { Test, TestingModule } from '@nestjs/testing';
import { FamiliarAlumnoService } from './familiar_alumno.service';

describe('FamiliarAlumnoService', () => {
  let service: FamiliarAlumnoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FamiliarAlumnoService],
    }).compile();

    service = module.get<FamiliarAlumnoService>(FamiliarAlumnoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
