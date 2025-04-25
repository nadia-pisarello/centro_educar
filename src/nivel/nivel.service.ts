import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNivelDto } from './dto/create-nivel.dto';
import { UpdateNivelDto } from './dto/update-nivel.dto';
import { Nivel } from './entities/nivel.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Alumno } from 'src/alumno/entities/alumno.entity';

@Injectable()
export class NivelService {
  constructor(
    @InjectRepository(Nivel)
    private readonly nivelRepository: Repository<Nivel>
  ) { }

  async create(createNivelDto: CreateNivelDto): Promise<Nivel> {
    const existeNivel = await this.nivelRepository.findOne({ where: { nivel: createNivelDto.nivel } })
    if (existeNivel) {
      throw new BadRequestException('Nivel ya existe')
    }
    const nivel = this.nivelRepository.create(createNivelDto)
    return await this.nivelRepository.save(nivel);
  }

  async findAll(): Promise<Nivel[]> {
    return await this.nivelRepository.find();
  }

  async findOne(nivel: string): Promise<Nivel> {
    const nivelEncontrado = await this.nivelRepository.findOne({ where: { nivel } })
    if (!nivelEncontrado) {
      throw new NotFoundException('No existe ese nivel')
    }
    return nivelEncontrado;
  }

  async findAlumnosPorNivel(nombre_nivel: string): Promise<Nivel> {
    const nivel = await this.nivelRepository.findOne({
      where: { nivel: nombre_nivel },
      relations: ['alumnos']
    })
    if (!nivel) {
      throw new NotFoundException('Nivel no encontrado')
    }
    return nivel
  }

  async update(nombre_nivel: string, updateNivelDto: UpdateNivelDto): Promise<void> {
    const nivel = await this.nivelRepository.findOne({ where: { nivel: nombre_nivel } })
    if (!nivel) {
      throw new NotFoundException('Nivel no encontrado')
    }
    Object.assign(nivel, updateNivelDto)
    await this.nivelRepository.update({ nivel: nombre_nivel }, updateNivelDto)
  }
  async remove(nivel: string): Promise<void> {
    const nivelEncontrado = await this.nivelRepository.findOne({ where: { nivel } })
    if (!nivelEncontrado) {
      throw new NotFoundException('No existe ese nivel')
    }
    this.nivelRepository.delete({ nivel })
  }
}