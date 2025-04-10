import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHorarioClaseDto } from './dto/create-horario_clase.dto';
import { UpdateHorarioClaseDto } from './dto/update-horario_clase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Aula } from 'src/aula/entities/aula.entity';
import { Repository } from 'typeorm';
import { Materia } from 'src/materia/entities/materia.entity';
import { HorarioClase } from './entities/horario_clase.entity';
import { IsEmpty } from 'class-validator';

@Injectable()
export class HorarioClaseService {
  constructor(
    @InjectRepository(Aula)
    private readonly aulaRepository: Repository<Aula>,
    @InjectRepository(Materia)
    private readonly materiaRepository: Repository<Materia>,
    @InjectRepository(HorarioClase)
    private readonly horarioRepository: Repository<HorarioClase>
  ) { }

  async asignarNuevoHorario(createHorarioClaseDto: CreateHorarioClaseDto): Promise<HorarioClase> {
    const aula = await this.aulaRepository.findOneBy({ nombre: createHorarioClaseDto.nombre_aula })
    if (!aula) {
      throw new NotFoundException('Aula no encontrada')
    }
    const materia = await this.materiaRepository.findOneBy({ nombre_materia: createHorarioClaseDto.nombre_materia })
    if (!materia) {
      throw new NotFoundException('Materia no encontrada')
    }
    const horario = await this.horarioRepository.findOneBy({
      nombre_materia: createHorarioClaseDto.nombre_materia,
      nombre_aula: createHorarioClaseDto.nombre_aula
    })
    if (horario) {
      throw new BadRequestException('Horario ya existe')
    }
    const nuevoHorario = this.horarioRepository.create(horario)
    return await this.horarioRepository.save(nuevoHorario);
  }

  async findAll(): Promise<HorarioClase[]> {
    return await this.horarioRepository.find();
  }

  async findOne(nombre_materia: string, nombre_aula: string): Promise<HorarioClase> {
    const horario = await this.horarioRepository.findOneBy({
      nombre_materia, nombre_aula
    })
    if (!horario) {
      throw new NotFoundException('Horario no encontrado')
    }
    return horario;
  }

  async remove(nombre_materia: string, nombre_aula: string): Promise<void> {
    const horario = await this.horarioRepository.findOneBy({
      nombre_materia, nombre_aula
    })
    if (horario) {
      throw new NotFoundException('Horario no encontrado')
    }
    this.horarioRepository.delete({ nombre_materia, nombre_aula });
  }
}
