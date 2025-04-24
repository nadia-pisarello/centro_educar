import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { HorarioClaseService } from './horario_clase.service';
import { CreateHorarioClaseDto } from './dto/create-horario_clase.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('horario-clase')
@UseGuards(AuthGuard, RolesGuard)
export class HorarioClaseController {
  constructor(private readonly horarioClaseService: HorarioClaseService) { }

  @Post()
  @Roles('Admin', 'NoDocente')
  async create(@Body() createHorarioClaseDto: CreateHorarioClaseDto) {
    return await this.horarioClaseService.asignarNuevoHorario(createHorarioClaseDto);
  }

  @Get()
  @Roles('Admin', 'NoDocente')
  async findAll() {
    return await this.horarioClaseService.findAll();
  }

  @Get(':materia')
  @Roles('Docente', 'Alumno', 'Familiar', 'Admin', 'NoDocente')
  async findOneMateria(@Param('materia') materia: string) {
    return await this.horarioClaseService.findOneMateria(materia);
  }

  @Delete(':materia/:aula')
  @Roles('Admin', 'NoDocente')
  async remove(
    @Param('materia') materia: string,
    @Param('aula') aula: string) {
    return await this.horarioClaseService.remove(materia, aula);
  }
}
