import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HorarioClaseService } from './horario_clase.service';
import { CreateHorarioClaseDto } from './dto/create-horario_clase.dto';
import { UpdateHorarioClaseDto } from './dto/update-horario_clase.dto';

@Controller('horario-clase')
export class HorarioClaseController {
  constructor(private readonly horarioClaseService: HorarioClaseService) { }

  @Post()
  async create(@Body() createHorarioClaseDto: CreateHorarioClaseDto) {
    return await this.horarioClaseService.asignarNuevoHorario(createHorarioClaseDto);
  }

  @Get()
  async findAll() {
    return await this.horarioClaseService.findAll();
  }

  @Get(':materia/:aula')
  async findOne(
    @Param('materia') materia: string,
    @Param('aula') aula: string) {
    return await this.horarioClaseService.findOne(materia, aula);
  }

  @Delete(':materia/:aula')
  async remove(
    @Param('materia') materia: string,
    @Param('aula') aula: string) {
    return await this.horarioClaseService.remove(materia, aula);
  }
}
