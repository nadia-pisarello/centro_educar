import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CuotaService } from './cuota.service';
import { CreateCuotaDto } from './dto/create-cuota.dto';
import { UpdateCuotaDto } from './dto/update-cuota.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('cuota')
@UseGuards(AuthGuard, RolesGuard)
export class CuotaController {
  constructor(private readonly cuotaService: CuotaService) { }

  @Post()

  create(@Body() createCuotaDto: CreateCuotaDto) {
    return this.cuotaService.create(createCuotaDto);
  }

  @Get()
  findAll() {
    return this.cuotaService.findAll();
  }

  @Get(':nro_cuota')
  findOne(@Param('nro_cuota') nro_cuota: number) {
    return this.cuotaService.findOne(+nro_cuota);
  }

  @Patch(':nro_cuota')
  update(@Param('nro_cuota') nro_cuota: number, @Body() updateCuotaDto: UpdateCuotaDto) {
    return this.cuotaService.update(+nro_cuota, updateCuotaDto);
  }

  @Delete(':nro_cuota')
  remove(@Param('nro_cuota') nro_cuota: number) {
    return this.cuotaService.remove(+nro_cuota);
  }
}
