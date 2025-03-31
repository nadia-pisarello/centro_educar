import { Module } from '@nestjs/common';
import { CuotaService } from './cuota.service';
import { CuotaController } from './cuota.controller';
import { Cuota } from './entities/cuota.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cuota])],
  controllers: [CuotaController],
  providers: [CuotaService],
})
export class CuotaModule { }
