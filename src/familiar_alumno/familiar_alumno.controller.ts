import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FamiliarAlumnoService } from './familiar_alumno.service';
import { CreateFamiliarAlumnoDto } from './dto/create-familiar_alumno.dto';
import { UpdateFamiliarAlumnoDto } from './dto/update-familiar_alumno.dto';

@Controller('familiar-alumno')
export class FamiliarAlumnoController {
  constructor(private readonly familiarAlumnoService: FamiliarAlumnoService) { }

  @Post()
  async create(@Body() createFamiliarAlumnoDto: CreateFamiliarAlumnoDto) {
    return await this.familiarAlumnoService.create(createFamiliarAlumnoDto);
  }

  @Get()
  async findAll() {
    return await this.familiarAlumnoService.findAll();
  }

  @Get(':dni_f/:dni_a')
  async findOne(@Param('dni_f') dni_f: string, @Param('dni_a') dni_a: string) {
    return await this.familiarAlumnoService.findOne(dni_f, dni_a);
  }

  @Get('/familiar/:dni_f')
  async findWhitDniF(@Param('dni_f') dni_f: string) {
    return await this.familiarAlumnoService.obtenerAlumnoDeFamiliar(dni_f)
  }

  @Get('/alumno/:dni_a')
  async findWhitDniA(@Param('dni_a') dni_a: string) {
    return await this.familiarAlumnoService.obtenerFamiliaresDeAlumno(dni_a)
  }

  @Delete(':dni_f/:dni_a')
  remove(@Param('dni_f') dni_f: string, @Param('dni_a') dni_a: string) {
    return this.familiarAlumnoService.remove(dni_f, dni_a);
  }
}
