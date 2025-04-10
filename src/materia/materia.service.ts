import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Materia } from './entities/materia.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class MateriaService {
  constructor(
    @InjectRepository(Materia)
    private readonly materiaRepository: Repository<Materia>
  ) { }

  async create(createMateriaDto: CreateMateriaDto): Promise<Materia> {
    const materia = await this.materiaRepository.findOneBy({ nombre_materia: createMateriaDto.nombre_materia })
    if (materia) {
      throw new BadRequestException('Esta materia ya existe')
    }
    const nuevaMateria = this.materiaRepository.create(materia)
    return await this.materiaRepository.save(nuevaMateria);
  }

  async findAll(): Promise<Materia[]> {
    return await this.materiaRepository.find();
  }

  async findOne(nombre_materia: string): Promise<Materia> {
    const materia = await this.materiaRepository.findOneBy({ nombre_materia })
    if (!materia) {
      throw new NotFoundException('Materia no encontrada')
    }
    return materia;
  }

  async update(nombre_materia: string, updateMateriaDto: UpdateMateriaDto): Promise<void> {
    const materia = await this.materiaRepository.findOneBy({ nombre_materia })
    if (!materia) {
      throw new NotFoundException('Materia no encontrada')
    }
    await this.materiaRepository.update(nombre_materia, updateMateriaDto);
  }

  async remove(nombre_materia: string): Promise<void> {
    const materia = await this.materiaRepository.findOneBy({ nombre_materia })
    if (!materia) {
      throw new NotFoundException('Materia no encontrada')
    }
    await this.materiaRepository.delete(nombre_materia);
  }
}
