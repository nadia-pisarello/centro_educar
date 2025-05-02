import { Module } from '@nestjs/common';
import { FamiliarAlumnoService } from './familiar_alumno.service';
import { FamiliarAlumnoController } from './familiar_alumno.controller';
import { FamiliarAlumno } from './entities/familiar_alumno.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Familiar } from 'src/familiar/entities/familiar.entity';
import { Alumno } from 'src/alumno/entities/alumno.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FamiliarAlumno, Familiar, Alumno])],
  controllers: [FamiliarAlumnoController],
  providers: [FamiliarAlumnoService],
})
export class FamiliarAlumnoModule { }
