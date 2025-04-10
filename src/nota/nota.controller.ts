import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotaService } from './nota.service';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';

@Controller('nota')
export class NotaController {
  constructor(private readonly notaService: NotaService) { }

  @Post()
  async create(@Body() createNotaDto: CreateNotaDto) {
    return await this.notaService.asignarNota(createNotaDto);
  }

  @Get()
  async findAll() {
    return await this.notaService.findAll();
  }

  @Get(':materia/:trimestre')
  findOne(
    @Param('materia') materia: string,
    @Param('trimestre') trimestre: number
  ) {
    return this.notaService.findOne(materia, trimestre);
  }

  @Patch(':materia/:trimestre')
  update(
    @Param('materia') materia: string,
    @Param('trimestre') trimestre: number, @Body() updateNotaDto: UpdateNotaDto) {
    return this.notaService.update(materia, trimestre, updateNotaDto);
  }

  @Delete(':materia/:trimestre')
  remove(
    @Param('materia') materia: string,
    @Param('trimestre') trimestre: number) {
    return this.notaService.remove(materia, trimestre);
  }
}
