import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreatePersonaRolDto } from './dto/create-persona_rol.dto';
import { UpdatePersonaRolDto } from './dto/update-persona_rol.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonaRol } from './entities/persona_rol.entity';
import { Repository } from 'typeorm';
import { Persona } from 'src/persona/entities/persona.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import { CreateRolDto } from 'src/rol/dto/create-rol.dto';
import { error } from 'console';

@Injectable()
export class PersonaRolService {
  constructor(
    @InjectRepository(PersonaRol)
    private personaRolRepository: Repository<PersonaRol>,
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>
  ) { }

  async asignarRol(createPersonaRolDto: CreatePersonaRolDto): Promise<PersonaRol> {
    const persona = await this.personaRepository.findOne({ where: { dni: createPersonaRolDto.dni_persona } })
    if (!persona) {
      throw new Error('Persona no encontrada')
    }
    const rol = await this.rolRepository.findOne({ where: { id_rol: createPersonaRolDto.id_rol } })
    if (!rol) {
      throw new Error('Rol no encontrado')
    }
    const personaRol = await this.personaRolRepository.findOneBy({
      dni_persona: createPersonaRolDto.dni_persona,
      id_rol: createPersonaRolDto.id_rol
    })
    if (personaRol) {
      throw new BadRequestException('Esta persona ya tiene este rol asignado')
    }
    const NuevoPersonaRol = this.personaRolRepository.create(createPersonaRolDto)
    return await this.personaRolRepository.save(NuevoPersonaRol);
  }

  async obtenerRolesPersonas(dni: string): Promise<PersonaRol[]> {
    return await this.personaRolRepository.find({ where: { dni_persona: dni }, relations: ['rol'] });
  }

  async obtenerPersonasConRol(id_rol: number): Promise<PersonaRol[]> {
    return await this.personaRolRepository.find({ where: { id_rol }, relations: ['persona'] })
  }

  async remove(dni: string, id: number): Promise<void> {
    const persona_rol = await this.personaRolRepository.findOne({ where: { dni_persona: dni, id_rol: id } })
    if (!persona_rol) {
      throw new Error('El rol no existe para esa persona')
    }
    await this.personaRolRepository.delete({ dni_persona: dni, id_rol: id });
  }
}
