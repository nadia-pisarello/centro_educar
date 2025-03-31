import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HorarioClaseService } from './horario_clase.service';
import { CreateHorarioClaseDto } from './dto/create-horario_clase.dto';
import { UpdateHorarioClaseDto } from './dto/update-horario_clase.dto';

@Controller('horario-clase')
export class HorarioClaseController {
  constructor(private readonly horarioClaseService: HorarioClaseService) {}

  @Post()
  create(@Body() createHorarioClaseDto: CreateHorarioClaseDto) {
    return this.horarioClaseService.create(createHorarioClaseDto);
  }

  @Get()
  findAll() {
    return this.horarioClaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.horarioClaseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHorarioClaseDto: UpdateHorarioClaseDto) {
    return this.horarioClaseService.update(+id, updateHorarioClaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.horarioClaseService.remove(+id);
  }
}
