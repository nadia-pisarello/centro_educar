import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/auth/user.decorator';

@Controller('factura')
@UseGuards(AuthGuard, RolesGuard)
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) { }

  @Post()
  create(@Body() createFacturaDto: CreateFacturaDto) {
    return this.facturaService.create(createFacturaDto);
  }

  @Get('facturas')
  @Roles('admin')
  findAll() {
    return this.facturaService.findAll();
  }

  @Get('facturas-alumno/:dni')
  @Roles('admin')
  obtenerFacturasAlumno(@Param('dni') dni: string) {
    return this.facturaService.obtenerFacturasPorDniAlumno(dni)
  }

  @Get('mis-facturas')
  @Roles('alumno')
  obtenerMisFacturas(@User() user) {
    return this.facturaService.obtenerFacturasPorDniAlumno(user.sub)
  }

  @Get('mis-facturas/:tipo/:numero')
  @Roles('alumno')
  findOne(
    @Param('tipo') tipo: string,
    @Param('numero') numero: number,
    @User() user,) {
    return this.facturaService.findOne(tipo, +numero, user.sub);
  }

  @Patch(':tipo/:numero')
  @Roles('admin')
  update(
    @Param('tipo') tipo: string,
    @Param('numero') numero: number,
    @Body() updateFacturaDto: UpdateFacturaDto) {
    return this.facturaService.update(tipo, +numero, updateFacturaDto);
  }

  @Delete(':tipo/:numero')
  @Roles('admin')
  remove(
    @Param('tipo') tipo: string,
    @Param('numero') numero: number,) {
    return this.facturaService.remove(tipo, +numero);
  }
}
