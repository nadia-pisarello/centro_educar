import { Module } from '@nestjs/common';
import { DocenteService } from './docente.service';
import { DocenteController } from './docente.controller';
import { Docente } from './entities/docente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from 'src/persona/entities/persona.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Docente, Persona])],
  controllers: [DocenteController],
  providers: [DocenteService],
})
export class DocenteModule { }
