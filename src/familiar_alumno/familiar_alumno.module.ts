import { Module } from '@nestjs/common';
import { FamiliarAlumnoService } from './familiar_alumno.service';
import { FamiliarAlumnoController } from './familiar_alumno.controller';
import { FamiliarAlumno } from './entities/familiar_alumno.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FamiliarAlumno])],
  controllers: [FamiliarAlumnoController],
  providers: [FamiliarAlumnoService],
})
export class FamiliarAlumnoModule { }
