import { Test, TestingModule } from '@nestjs/testing';
import { FamiliarAlumnoController } from './familiar_alumno.controller';
import { FamiliarAlumnoService } from './familiar_alumno.service';

describe('FamiliarAlumnoController', () => {
  let controller: FamiliarAlumnoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamiliarAlumnoController],
      providers: [FamiliarAlumnoService],
    }).compile();

    controller = module.get<FamiliarAlumnoController>(FamiliarAlumnoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
