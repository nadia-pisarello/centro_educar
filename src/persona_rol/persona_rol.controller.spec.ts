import { Test, TestingModule } from '@nestjs/testing';
import { PersonaRolController } from './persona_rol.controller';
import { PersonaRolService } from './persona_rol.service';

describe('PersonaRolController', () => {
  let controller: PersonaRolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonaRolController],
      providers: [PersonaRolService],
    }).compile();

    controller = module.get<PersonaRolController>(PersonaRolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
