import { Test, TestingModule } from '@nestjs/testing';
import { PersonaRolService } from './persona_rol.service';

describe('PersonaRolService', () => {
  let service: PersonaRolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonaRolService],
    }).compile();

    service = module.get<PersonaRolService>(PersonaRolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
