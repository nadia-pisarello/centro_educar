import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFamiliarAlumnoDto } from './dto/create-familiar_alumno.dto';
import { UpdateFamiliarAlumnoDto } from './dto/update-familiar_alumno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Familiar } from 'src/familiar/entities/familiar.entity';
import { Repository } from 'typeorm';
import { Alumno } from 'src/alumno/entities/alumno.entity';
import { FamiliarAlumno } from './entities/familiar_alumno.entity';

@Injectable()
export class FamiliarAlumnoService {
  constructor(
    @InjectRepository(FamiliarAlumno)
    private readonly fmRepository: Repository<FamiliarAlumno>,
    @InjectRepository(Familiar)
    private readonly familiarRepository: Repository<Familiar>,
    @InjectRepository(Alumno)
    private readonly alumnoRepository: Repository<Alumno>
  ) { }

  async create(createFamiliarAlumnoDto: CreateFamiliarAlumnoDto): Promise<FamiliarAlumno> {
    const alumno = await this.alumnoRepository.findOneBy({ dni_alumno: createFamiliarAlumnoDto.dni_alumno })
    if (!alumno) {
      throw new NotFoundException('Alumno no encontrado')
    }
    const familiar = await this.familiarRepository.findOneBy({ dni_familiar: createFamiliarAlumnoDto.dni_familiar })
    if (!familiar) {
      throw new NotFoundException('Familiar no encontrado')
    }
    const fm = await this.fmRepository.findOneBy({
      dni_familiar: createFamiliarAlumnoDto.dni_familiar,
      dni_alumno: createFamiliarAlumnoDto.dni_alumno
    })
    if (fm) {
      throw new BadRequestException('Relación existente')
    }
    const nuevoFM = this.fmRepository.create(createFamiliarAlumnoDto)
    return await this.fmRepository.save(nuevoFM);
  }

  async findAll(): Promise<FamiliarAlumno[]> {
    return await this.fmRepository.find();
  }

  async findOne(dni_f: string, dni_a: string): Promise<FamiliarAlumno> {
    const fm = await this.fmRepository.findOneBy({
      dni_familiar: dni_f,
      dni_alumno: dni_a
    })
    if (!fm) {
      throw new NotFoundException('No existe esta relación')
    }
    return fm;
  }

  async obtenerFamiliaresDeAlumno(dni_alumno: string): Promise<FamiliarAlumno[]> {
    return await this.fmRepository.find({ where: { dni_alumno }, relations: ['familiar'] });
  }

  async obtenerAlumnoDeFamiliar(dni_familiar: string): Promise<FamiliarAlumno[]> {
    return await this.fmRepository.find({ where: { dni_familiar }, relations: ['alumno'] })
  }

  async remove(dni_f: string, dni_a: string): Promise<void> {
    const fm = await this.fmRepository.findOneBy({
      dni_familiar: dni_f,
      dni_alumno: dni_a
    })
    if (!fm) {
      throw new NotFoundException('La relación no existe')
    }
    await this.fmRepository.delete(fm);
  }
}
