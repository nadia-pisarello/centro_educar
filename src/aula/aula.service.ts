import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Aula } from './entities/aula.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AulaService {
  constructor(
    @InjectRepository(Aula)
    private readonly aulaRepository: Repository<Aula>
  ) { }

  async create(createAulaDto: CreateAulaDto): Promise<Aula> {
    const aula = await this.aulaRepository.findOne({ where: { nombre: createAulaDto.nombre } })
    if (aula) {
      throw new BadRequestException('Ya existe esta aula')
    }
    const nuevaAula = this.aulaRepository.create(createAulaDto)
    return this.aulaRepository.save(nuevaAula);
  }

  async findAll(): Promise<Aula[]> {
    return await this.aulaRepository.find();
  }

  async findOne(nombre: string): Promise<Aula> {
    const aula = await this.aulaRepository.findOne({ where: { nombre } })
    if (!aula) {
      throw new NotFoundException('El aula no existe')
    }
    return aula;
  }

  async update(nombre: string, updateAulaDto: UpdateAulaDto): Promise<void> {
    const aula = await this.aulaRepository.findOne({ where: { nombre } })
    if (!aula) {
      throw new NotFoundException('El aula no existe')
    }
    await this.aulaRepository.update(nombre, updateAulaDto);
  }

  async remove(nombre: string): Promise<void> {
    const aula = await this.aulaRepository.findOne({ where: { nombre } });
    if (!aula) {
      throw new NotFoundException('El aula no existe')
    }
    await this.aulaRepository.delete(nombre)
  }
}
