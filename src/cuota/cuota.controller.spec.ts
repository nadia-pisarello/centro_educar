import { Test, TestingModule } from '@nestjs/testing';
import { CuotaController } from './cuota.controller';
import { CuotaService } from './cuota.service';

describe('CuotaController', () => {
  let controller: CuotaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CuotaController],
      providers: [CuotaService],
    }).compile();

    controller = module.get<CuotaController>(CuotaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
