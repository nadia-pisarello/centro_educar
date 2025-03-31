import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Alumno } from './entities/alumno.entity';
import { Repository } from 'typeorm';
import { Persona } from 'src/persona/entities/persona.entity';

@Injectable()
export class AlumnoService {
  constructor(
    @InjectRepository(Alumno)
    private readonly alumnoRepository: Repository<Alumno>,
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>
  ) { }

  async create(createAlumnoDto: CreateAlumnoDto): Promise<Alumno> {
    const persona = await this.personaRepository.findOne({ where: { dni: createAlumnoDto.dni } })
    if (!persona) {
      throw new BadRequestException('Persona no encontrada. Debe registrarsela primero')
    }
    const existeAlumno = await this.alumnoRepository.findOneBy({ legajo: createAlumnoDto.legajo })
    if (existeAlumno) {
      throw new BadRequestException('El legajo ya existe')
    }
    const alumno = this.alumnoRepository.create(createAlumnoDto)
    return await this.alumnoRepository.save(alumno);
  }

  async findAll(): Promise<Alumno[]> {
    return await this.alumnoRepository.find();
  }

  async findOne(legajo: number): Promise<Alumno> {
    const alumno = await this.alumnoRepository.findOneBy({ legajo })
    if (!alumno) {
      throw new NotFoundException('Alumno no encontrado')
    }
    return alumno;
  }

  async update(legajo: number, updateAlumnoDto: UpdateAlumnoDto): Promise<void> {
    const alumno = await this.alumnoRepository.findOneBy({ legajo })
    if (!alumno) {
      throw new NotFoundException('Alumno no encontrado')
    }
    Object.assign(alumno, updateAlumnoDto)
    await this.alumnoRepository.update(legajo, updateAlumnoDto);
  }

  async remove(legajo: number): Promise<void> {
    const alumno = await this.alumnoRepository.findOne({ where: { legajo } })
    if (!alumno) {
      throw new NotFoundException('Alumno no encontrado')
    }
    await this.alumnoRepository.delete(legajo)
  }
}
