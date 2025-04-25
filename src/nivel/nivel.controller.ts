import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NivelService } from './nivel.service';
import { CreateNivelDto } from './dto/create-nivel.dto';
import { UpdateNivelDto } from './dto/update-nivel.dto';
import { Roles } from 'src/auth/roles.decorator';

@Controller('nivel')
export class NivelController {
  constructor(private readonly nivelService: NivelService) { }

  @Post()
  @Roles('Admin', 'NoDocente')
  async create(@Body() createNivelDto: CreateNivelDto) {
    return this.nivelService.create(createNivelDto);
  }

  @Get()
  findAll() {
    return this.nivelService.findAll();
  }

  @Get(':nivel')
  findOne(@Param('nivel') nivel: string) {
    return this.nivelService.findOne(nivel);
  }

  @Get('alumnos/:nivel')
  @Roles('Admin', 'NoDocente', 'Docente')
  encontrarAlumnosPorNivel(@Param('nivel') nivel: string) {
    return this.nivelService.findAlumnosPorNivel(nivel)
  }

  @Patch(':nivel')
  @Roles('Admin', 'NoDocente')
  update(@Param('nivel') nivel: string, @Body() updateNivelDto: UpdateNivelDto) {
    return this.nivelService.update(nivel, updateNivelDto);
  }

  @Delete(':nivel')
  @Roles('Admin', 'NoDocente')
  remove(@Param('nivel') nivel: string) {
    return this.nivelService.remove(nivel);
  }
}
