import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlumnoService } from './alumno.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';

@Controller('alumno')
export class AlumnoController {
  constructor(
    private readonly alumnoService: AlumnoService
  ) { }

  @Post()
  async create(@Body() createAlumnoDto: CreateAlumnoDto) {
    return this.alumnoService.create(createAlumnoDto);
  }

  @Get()
  async findAll() {
    return this.alumnoService.findAll();
  }

  @Get(':legajo')
  async findOne(@Param('legajo') legajo: number) {
    return this.alumnoService.findOne(+legajo);
  }

  @Patch(':legajo')
  update(@Param('legajo') legajo: number, @Body() updateAlumnoDto: UpdateAlumnoDto) {
    return this.alumnoService.update(+legajo, updateAlumnoDto);
  }

  @Delete(':legajo')
  async remove(@Param('legajo') legajo: number) {
    return this.alumnoService.remove(+legajo);
  }
}
