import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';

@Controller('asistencia')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) { }

  @Post()
  create(@Body() createAsistenciaDto: CreateAsistenciaDto) {
    return this.asistenciaService.create(createAsistenciaDto);
  }

  @Get()
  findAll() {
    return this.asistenciaService.findAll();
  }

  @Get(':legajo/:fecha')
  findOne(
    @Param('legajo') legajo: number,
    @Param('fecha') fecha: string
  ) {
    return this.asistenciaService.findOne(legajo, fecha);
  }

  @Patch(':legajo/:fecha')
  update(
    @Param('legajo') legajo: number,
    @Param('fecha') fecha: string,
    @Body() updateAsistenciaDto: UpdateAsistenciaDto) {
    return this.asistenciaService.update(+legajo, fecha, updateAsistenciaDto);
  }

  @Delete(':legajo/:fecha')
  remove(@Param('legajo') legajo: number,
    @Param('fecha') fecha: string) {
    return this.asistenciaService.remove(+legajo, fecha);
  }
}
