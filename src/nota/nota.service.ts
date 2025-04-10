import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Nota } from './entities/nota.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotaService {
  constructor(
    @InjectRepository(Nota)
    private readonly notaRepository: Repository<Nota>
  ) { }

  async asignarNota(createNotaDto: CreateNotaDto): Promise<Nota> {
    const nota = await this.notaRepository.findOneBy({
      nombre_materia: createNotaDto.nombre_materia,
      trimestre: createNotaDto.trimestre
    })
    if (nota) {
      throw new BadRequestException('Nota ya asignada')
    }
    const nuevaNota = this.notaRepository.create(nota)
    return await this.notaRepository.save(nuevaNota);
  }

  async findAll(): Promise<Nota[]> {
    return await this.notaRepository.find();
  }

  async findOne(nombre_materia: string, trimestre: number): Promise<Nota> {
    const nota = await this.notaRepository.findOneBy({
      nombre_materia, trimestre
    })
    if (!nota) {
      throw new NotFoundException('Nota no encontrada')
    }
    return nota;
  }

  async update(nombre_materia: string, trimestre: number, updateNotaDto: UpdateNotaDto): Promise<void> {
    const nota = await this.notaRepository.findOneBy({
      nombre_materia, trimestre
    })
    if (!nota) {
      throw new NotFoundException('Nota no encontrada')
    }
    await this.notaRepository.update({ nombre_materia, trimestre }, updateNotaDto);
  }

  async remove(nombre_materia: string, trimestre: number): Promise<void> {
    const nota = await this.notaRepository.findOneBy({
      nombre_materia, trimestre
    })
    if (!nota) {
      throw new NotFoundException('Nota no encontrada')
    }
    await this.notaRepository.delete({ nombre_materia, trimestre });
  }
}
