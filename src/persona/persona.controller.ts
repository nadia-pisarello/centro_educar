import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/auth/user.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('user')
@UseGuards(AuthGuard, RolesGuard)
export class PersonaController {
  constructor(private readonly personaService: PersonaService) { }

  @Post('register')
  async create(@Body() createPersonaDto: CreatePersonaDto) {
    return await this.personaService.create(createPersonaDto)
  }

  @Roles('Admin')
  @Get()
  async findAll() {
    return await this.personaService.findAll();
  }

  @Get('perfil')
  getProfile(@User() user: { sub: string }) {
    return this.personaService.findOne(user.sub)
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
