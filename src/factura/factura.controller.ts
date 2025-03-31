import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';

@Controller('factura')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) { }

  @Post()
  create(@Body() createFacturaDto: CreateFacturaDto) {
    return this.facturaService.create(createFacturaDto);
  }

  @Get()
  findAll() {
    return this.facturaService.findAll();
  }

  @Get(':tipo/:numero')
  findOne(
    @Param('tipo') tipo: string,
    @Param('numero') numero: number) {
    return this.facturaService.findOne(tipo, +numero);
  }

  @Patch(':tipo/:numero')
  update(
    @Param('tipo') tipo: string,
    @Param('numero') numero: number,
    @Body() updateFacturaDto: UpdateFacturaDto) {
    return this.facturaService.update(tipo, +numero, updateFacturaDto);
  }

  @Delete(':tipo/:numero')
  remove(
    @Param('tipo') tipo: string,
    @Param('numero') numero: number,) {
    return this.facturaService.remove(tipo, +numero);
  }
}
