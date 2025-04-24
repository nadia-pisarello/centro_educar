import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/auth/user.decorator';

@Controller('asistencia')
@UseGuards(AuthGuard, RolesGuard)
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) { }

  @Post()
  @Roles('Docente', 'NoDocente')
  create(@Body() createAsistenciaDto: CreateAsistenciaDto) {
    return this.asistenciaService.create(createAsistenciaDto);
  }

  @Get()
  @Roles('Docente', 'NoDocente', 'Alumno', 'Familiar')
  findAll(@Request() req) {
    return this.asistenciaService.findAll(req.user);
  }

  @Get(':legajo/:fecha')
  @Roles('Docente', 'NoDocente', 'Familiar', 'Alumno')
  findOne(
    @Param('legajo') legajo: number,
    @Param('fecha') fecha: string,
    @User() user: any
  ) {
    return this.asistenciaService.findOne(legajo, fecha, user);
  }

  @Patch(':legajo/:fecha')
  @Roles('Docente', 'NoDocente')
  update(
    @Param('legajo') legajo: number,
    @Param('fecha') fecha: string,
    @Body() updateAsistenciaDto: UpdateAsistenciaDto) {
    return this.asistenciaService.update(+legajo, fecha, updateAsistenciaDto);
  }

  @Delete(':legajo/:fecha')
  @Roles('Docente', 'NoDocente')
  remove(@Param('legajo') legajo: number,
    @Param('fecha') fecha: string) {
    return this.asistenciaService.remove(+legajo, fecha);
  }
}
