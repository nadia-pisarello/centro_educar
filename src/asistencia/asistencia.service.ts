import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { Repository } from 'typeorm';
import { Alumno } from 'src/alumno/entities/alumno.entity';

@Injectable()
export class AsistenciaService {

  constructor(
    @InjectRepository(Asistencia)
    private readonly asistenciaRepository: Repository<Asistencia>,
    @InjectRepository(Alumno)
    private readonly alumnoRepository: Repository<Alumno>
  ) { }

  async create(createAsistenciaDto: CreateAsistenciaDto): Promise<Asistencia> {
    const alumno = await this.alumnoRepository.findOne({ where: { legajo: createAsistenciaDto.legajo_alumno } })
    if (!alumno) {
      throw new BadRequestException('Alumno no encontrado')
    }
    const existe = this.asistenciaRepository.findOne({
      where: {
        legajo_alumno: createAsistenciaDto.legajo_alumno,
        fecha: createAsistenciaDto.fecha
      }
    })
    if (existe) {
      throw new BadRequestException('Ya se registro la asistencia al alumno en esta fecha')
    }
    const asistencia = this.asistenciaRepository.create(createAsistenciaDto)
    return await this.asistenciaRepository.save(asistencia);
  }

  async findAll(): Promise<Asistencia[]> {
    return await this.asistenciaRepository.find();
  }

  async findOne(legajo: number, fecha: string): Promise<Asistencia | null> {
    const asistencia = await this.asistenciaRepository.findOne({
      where: {
        legajo_alumno: legajo,
        fecha
      },
      relations: ['legajo_alumno']
    })
    if (!asistencia) {
      throw new Error('No se encontró la asistencia')
    }
    return asistencia;
  }

  async update(legajo_alumno: number, fecha: string, updateAsistenciaDto: UpdateAsistenciaDto): Promise<void> {
    const asistencia = await this.asistenciaRepository.findOne({
      where: { legajo_alumno, fecha },
      relations: ['legajo_alumno']
    })
    if (!asistencia) {
      throw new NotFoundException('Asistencia no encontrada')
    }
    await this.asistenciaRepository.update({ legajo_alumno, fecha }, updateAsistenciaDto);
  }

  async remove(legajo_alumno: number, fecha: string): Promise<void> {
    const asistencia = await this.asistenciaRepository.findOne({
      where: { legajo_alumno, fecha }
    })
    if (!asistencia) {
      throw new Error('Asistencia no encontrada')
    }
    await this.asistenciaRepository.delete(asistencia);
  }
}
