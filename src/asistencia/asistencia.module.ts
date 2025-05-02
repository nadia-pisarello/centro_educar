import { Module } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaController } from './asistencia.controller';
import { Asistencia } from './entities/asistencia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alumno } from 'src/alumno/entities/alumno.entity';
import { FamiliarAlumno } from 'src/familiar_alumno/entities/familiar_alumno.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asistencia, Alumno, FamiliarAlumno])],
  controllers: [AsistenciaController],
  providers: [AsistenciaService],
})
export class AsistenciaModule { }
