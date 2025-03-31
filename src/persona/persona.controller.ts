import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';

@Controller('user')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) { }

  @Post()
  async create(@Body() createPersonaDto: CreatePersonaDto) {
    return await this.personaService.create(createPersonaDto)
  }

  @Get()
  async findAll() {
    return await this.personaService.findAll();
  }

  @Get(':dni')
  async findOne(@Param('dni') dni: string) {
    return await this.personaService.findOne(dni);
  }

  @Patch(':dni')
  async update(@Param('dni') dni: string, @Body() updatePersonaDto: UpdatePersonaDto) {
    return await this.personaService.update(dni, updatePersonaDto);
  }

  @Delete(':dni')
  async remove(@Param('dni') dni: string) {
    return await this.personaService.remove(dni);
  }
}
