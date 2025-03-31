import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFamiliarDto } from './dto/create-familiar.dto';
import { UpdateFamiliarDto } from './dto/update-familiar.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Familiar } from './entities/familiar.entity';
import { Repository } from 'typeorm';
import { Persona } from 'src/persona/entities/persona.entity';

@Injectable()
export class FamiliarService {
  constructor(
    @InjectRepository(Familiar)
    private readonly familiarRepository: Repository<Familiar>,
    @InjectRepository(Familiar)
    private readonly personaRepository: Repository<Persona>
  ) { }

  async create(createFamiliarDto: CreateFamiliarDto): Promise<Familiar> {
    const persona = await this.personaRepository.findOneBy({ dni: createFamiliarDto.dni_familiar })
    if (!persona) {
      throw new NotFoundException('Persona no encontrada. Debe registrarla primero')
    }
    const familiar = await this.familiarRepository.findOneBy({ dni_familiar: createFamiliarDto.dni_familiar })
    if (familiar) {
      throw new BadRequestException('El familiar ya existe')
    }
    const nuevoFamiliar = this.familiarRepository.create(createFamiliarDto)
    return await this.familiarRepository.save(familiar);
  }

  async findAll(): Promise<Familiar[]> {
    return await this.familiarRepository.find();
  }

  async findOne(dni_familiar: string): Promise<Familiar> {
    const familiar = await this.familiarRepository.findOneBy({ dni_familiar })
    if (!familiar) {
      throw new NotFoundException('Familiar no encontrado')
    }
    return familiar;
  }

  async update(dni: string, updateFamiliarDto: UpdateFamiliarDto): Promise<void> {
    const familiar = await this.familiarRepository.findOneBy({ dni_familiar: dni })
    if (!familiar) {
      throw new NotFoundException('Familiar no encontrado')
    }
    await this.familiarRepository.update(dni, updateFamiliarDto);
  }

  async remove(dni: string): Promise<void> {
    const familiar = await this.familiarRepository.findOneBy({ dni_familiar: dni })
    if (!familiar) {
      throw new NotFoundException('El familiar no existe')
    }
    await this.familiarRepository.delete(dni);
  }
}
