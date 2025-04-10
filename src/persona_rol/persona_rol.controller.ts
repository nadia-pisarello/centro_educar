import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PersonaRolService } from './persona_rol.service';
import { CreatePersonaRolDto } from './dto/create-persona_rol.dto';

@Controller('persona-rol')
export class PersonaRolController {
  constructor(private readonly personaRolService: PersonaRolService) { }

  @Post()
  asignarRol(@Body() createPersonaRolDto: CreatePersonaRolDto) {
    return this.personaRolService.asignarRol(createPersonaRolDto);
  }

  @Get(':dni')
  obtenerRoles(@Param('dni') dni: string) {
    return this.personaRolService.obtenerRolesPersonas(dni);
  }

  @Get('/roles/:id')
  findOne(@Param('id') id: number) {
    return this.personaRolService.obtenerPersonasConRol(id);
  }

  @Delete(':dni/:id')
  remove(
    @Param('dni') dni: string,
    @Param('id') id: number
  ) {
    return this.personaRolService.remove(dni, id);
  }
}
