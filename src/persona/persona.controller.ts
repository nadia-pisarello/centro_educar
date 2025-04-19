import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/auth/user.decorator';

@Controller('user')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) { }

  @Post()
  async create(@Body() createPersonaDto: CreatePersonaDto) {
    return await this.personaService.create(createPersonaDto)
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.personaService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('perfil')
  getProfile(@User() user: { sub: string }) {
    return this.personaService.findOne(user.sub)
  }

  @Get(':dni')
  async findOne(@Param('dni') dni: string) {
    return await this.personaService.findOne(dni);
  }

  @UseGuards(AuthGuard)
  @Patch(':dni')
  async update(@Param('dni') dni: string, @Body() updatePersonaDto: UpdatePersonaDto) {
    return await this.personaService.update(dni, updatePersonaDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':dni')
  async remove(@Param('dni') dni: string) {
    return await this.personaService.remove(dni);
  }
}
