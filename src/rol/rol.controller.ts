import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Controller('rol')
export class RolController {

  constructor(private readonly rolService: RolService) { }

  @Post()
  async create(@Body() createRolDto: CreateRolDto) {
    return this.rolService.create(createRolDto);
  }

  @Get()
  async findAll() {
    return this.rolService.findAll();
  }

  @Get(':rol')
  async findOne(@Param('rol') rol: string) {
    const rolParam = !isNaN(Number(rol)) ? Number(rol) : rol;
    return this.rolService.findOne(rolParam);
  }

  @Patch(':id_rol')
  async update(@Param('id_rol') id_rol: number, @Body() updateRolDto: UpdateRolDto) {
    return this.rolService.update(+id_rol, updateRolDto);
  }

  @Delete(':id_rol')
  async remove(@Param('id_rol') id_rol: number) {
    return this.rolService.remove(+id_rol);
  }
}
