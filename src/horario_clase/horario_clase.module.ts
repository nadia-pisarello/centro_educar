import { Module } from '@nestjs/common';
import { HorarioClaseService } from './horario_clase.service';
import { HorarioClaseController } from './horario_clase.controller';
import { HorarioClase } from './entities/horario_clase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([HorarioClase])],
  controllers: [HorarioClaseController],
  providers: [HorarioClaseService],
})
export class HorarioClaseModule { }
