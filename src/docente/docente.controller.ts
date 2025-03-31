import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocenteService } from './docente.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';

@Controller('docente')
export class DocenteController {
  constructor(private readonly docenteService: DocenteService) { }

  @Post()
  create(@Body() createDocenteDto: CreateDocenteDto) {
    return this.docenteService.create(createDocenteDto);
  }

  @Get()
  findAll() {
    return this.docenteService.findAll();
  }

  @Get(':legajo')
  findOne(@Param('legajo') legajo: number) {
    return this.docenteService.findOne(+legajo);
  }

  @Patch(':legajo')
  update(@Param('legajo') legajo: number, @Body() updateDocenteDto: UpdateDocenteDto) {
    return this.docenteService.update(+legajo, updateDocenteDto);
  }

  @Delete(':legajo')
  remove(@Param('legajo') legajo: number) {
    return this.docenteService.remove(+legajo);
  }
}
