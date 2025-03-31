import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Docente } from './entities/docente.entity';
import { Persona } from 'src/persona/entities/persona.entity';

@Injectable()
export class DocenteService {
  constructor(
    @InjectRepository(Docente)
    private readonly docenteRepository: Repository<Docente>,
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>
  ) { }

  async create(createDocenteDto: CreateDocenteDto): Promise<Docente> {
    const persona = await this.personaRepository.findOneBy({ dni: createDocenteDto.dni_docente })
    if (!persona) {
      throw new NotFoundException('La persona no existe debe cargarla primero')
    }
    const docente = await this.docenteRepository.findOneBy({ legajo: createDocenteDto.legajo })
    if (docente) {
      throw new BadRequestException('El docente ya existe')
    }
    const nuevoDocente = this.docenteRepository.create(createDocenteDto)
    return await this.docenteRepository.save(nuevoDocente);
  }

  async findAll(): Promise<Docente[]> {
    return await this.docenteRepository.find();
  }

  async findOne(legajo: number): Promise<Docente> {
    const docente = await this.docenteRepository.findOneBy({ legajo })
    if (!docente) {
      throw new NotFoundException('El docente no existe')
    }
    return docente;
  }

  async update(legajo: number, updateDocenteDto: UpdateDocenteDto): Promise<void> {
    const docente = await this.docenteRepository.findOneBy({ legajo })
    if (!docente) {
      throw new NotFoundException('El docente no existe')
    }
    await this.docenteRepository.update(legajo, updateDocenteDto);
  }

  async remove(legajo: number): Promise<void> {
    const docente = await this.docenteRepository.findOneBy({ legajo })
    if (!docente) {
      throw new NotFoundException('El docente no existe')
    }
    await this.docenteRepository.delete(legajo);
  }
}
