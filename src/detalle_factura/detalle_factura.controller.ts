import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleFacturaService } from './detalle_factura.service';
import { CreateDetalleFacturaDto } from './dto/create-detalle_factura.dto';
import { UpdateDetalleFacturaDto } from './dto/update-detalle_factura.dto';

@Controller('detalle-factura')
export class DetalleFacturaController {
  constructor(private readonly detalleFacturaService: DetalleFacturaService) { }

  @Post()
  create(@Body() createDetalleFacturaDto: CreateDetalleFacturaDto) {
    return this.detalleFacturaService.create(createDetalleFacturaDto);
  }

  @Get()
  findAll() {
    return this.detalleFacturaService.findAll();
  }

  @Get(':tipo_factura/:nro_factura/:nro_cuota')
  findOne(
    @Param('tipo_factura') tipo_factura: string,
    @Param('nro_factura') nro_factura: number,
    @Param('nro_cuota') nro_cuota: number) {
    return this.detalleFacturaService.findOne(tipo_factura, +nro_factura, +nro_cuota);
  }

  @Patch(':tipo_factura/:nro_factura/:nro_cuota')
  update(
    @Param('tipo_factura') tipo_factura: string,
    @Param('nro_factura') nro_factura: number,
    @Param('nro_cuota') nro_cuota: number,
    @Body() updateDetalleFacturaDto: UpdateDetalleFacturaDto) {
    return this.detalleFacturaService.update(tipo_factura, +nro_factura, +nro_cuota, updateDetalleFacturaDto);
  }

  @Delete(':tipo_factura/:nro_factura/:nro_cuota')
  remove(@Param('tipo_factura') tipo_factura: string,
    @Param('nro_factura') nro_factura: number,
    @Param('nro_cuota') nro_cuota: number) {
    return this.detalleFacturaService.remove(tipo_factura, +nro_factura, +nro_cuota);
  }
}
