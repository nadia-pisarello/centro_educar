import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AulaService } from './aula.service';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';

@Controller('aula')
export class AulaController {
  constructor(private readonly aulaService: AulaService) { }

  @Post()
  create(@Body() createAulaDto: CreateAulaDto) {
    return this.aulaService.create(createAulaDto);
  }

  @Get()
  findAll() {
    return this.aulaService.findAll();
  }

  @Get(':nombre')
  findOne(@Param('nombre') nombre: string) {
    return this.aulaService.findOne(nombre);
  }

  @Patch(':nombre')
  update(@Param('nombre') nombre: string, @Body() updateAulaDto: UpdateAulaDto) {
    return this.aulaService.update(nombre, updateAulaDto);
  }

  @Delete(':nombre')
  remove(@Param('nombre') nombre: string) {
    return this.aulaService.remove(nombre);
  }
}
