import { Test, TestingModule } from '@nestjs/testing';
import { HorarioClaseController } from './horario_clase.controller';
import { HorarioClaseService } from './horario_clase.service';

describe('HorarioClaseController', () => {
  let controller: HorarioClaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HorarioClaseController],
      providers: [HorarioClaseService],
    }).compile();

    controller = module.get<HorarioClaseController>(HorarioClaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
