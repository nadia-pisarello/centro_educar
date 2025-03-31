import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PersonaRolService } from './persona_rol.service';
import { CreatePersonaRolDto } from './dto/create-persona_rol.dto';

@Controller('persona-rol')
export class PersonaRolController {
  constructor(private readonly personaRolService: PersonaRolService) { }

  @Post()
  async asignarRol(@Body() createPersonaRolDto: CreatePersonaRolDto) {
    return await this.personaRolService.asignarRol(createPersonaRolDto);
  }

  @Get(':dni')
  async obtenerRoles(@Param('dni') dni: string) {
    return await this.personaRolService.obtenerRolesPersonas(dni);
  }

  @Get('/roles/:id')
  async findOne(@Param('id') id: number) {
    return await this.personaRolService.obtenerPersonasConRol(id);
  }

  @Delete(':dni/:id')
  async remove(
    @Param('dni') dni: string,
    @Param('id') id: number
  ) {
    return await this.personaRolService.remove(dni, id);
  }
}
