import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MateriaService } from './materia.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';

@Controller('materia')
export class MateriaController {
  constructor(private readonly materiaService: MateriaService) { }

  @Post()
  async create(@Body() createMateriaDto: CreateMateriaDto) {
    return await this.materiaService.create(createMateriaDto);
  }

  @Get('materias')
  async findAll() {
    return await this.materiaService.findAll();
  }

  @Get(':materia')
  async findOne(@Param('materia') materia: string) {
    return await this.materiaService.findOne(materia);
  }

  @Patch(':materia')
  async update(@Param('materia') materia: string, @Body() updateMateriaDto: UpdateMateriaDto) {
    return this.materiaService.update(materia, updateMateriaDto);
  }

  @Delete(':materia')
  async remove(@Param('materia') materia: string) {
    return await this.materiaService.remove(materia);
  }
}
