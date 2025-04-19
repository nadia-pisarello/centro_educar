import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Persona } from './entities/persona.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadPersonaDto } from './dto/read-persona.dto';

@Injectable()
export class PersonaService {

  constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) { }

  async create(createPersonaDto: CreatePersonaDto): Promise<Persona> {
    const existe = await this.personaRepository.findOne({ where: { dni: createPersonaDto.dni } })
    if (existe) {
      throw new BadRequestException('Este dni ya está siendo ocupado')
    }
    const { password, ...data } = createPersonaDto
    const hashedPassword = await bcrypt.hash(password, 10)
    const nuevaPersona = this.personaRepository.create({
      ...data,
      password: hashedPassword,
    });
    return await this.personaRepository.save(nuevaPersona);
  }

  async findAll(): Promise<ReadPersonaDto[]> {
    const usuarios = await this.personaRepository.find()
    return usuarios.map(({ password, ...data }) => data as ReadPersonaDto)
  }

  async findOne(dni: string): Promise<ReadPersonaDto> {
    const usuario = await this.personaRepository.findOne({ where: { dni } })
    if (!usuario) {
      throw new NotFoundException('El usuario no existe')
    }
    const { password, ...persona } = usuario
    return persona;
  }

  async update(dni: string, updatePersonaDto: UpdatePersonaDto): Promise<void> {
    const persona = await this.personaRepository.findOne({ where: { dni } })
    if (!persona) {
      throw new NotFoundException('Usuario no encontrado')
    }

    if (updatePersonaDto.password) {
      updatePersonaDto.password = await bcrypt.hash(updatePersonaDto.password, 10)
    }

    //Object.assign(persona, updatePersonaDo)
    await this.personaRepository.update(dni, updatePersonaDto)
  }

  async remove(dni: string): Promise<void> {
    const persona = await this.personaRepository.findOne({ where: { dni } })
    if (!persona) {
      throw new NotFoundException('Usuario no encontrado')
    }
    await this.personaRepository.delete({ dni })
  }
}
