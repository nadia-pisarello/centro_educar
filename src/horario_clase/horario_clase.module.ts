import { Module } from '@nestjs/common';
import { HorarioClaseService } from './horario_clase.service';
import { HorarioClaseController } from './horario_clase.controller';
import { HorarioClase } from './entities/horario_clase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aula } from 'src/aula/entities/aula.entity';
import { Materia } from 'src/materia/entities/materia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HorarioClase, Aula, Materia])],
  controllers: [HorarioClaseController],
  providers: [HorarioClaseService],
})
export class HorarioClaseModule { }
