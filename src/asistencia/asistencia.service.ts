import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { In, Repository } from 'typeorm';
import { Alumno } from 'src/alumno/entities/alumno.entity';
import { FamiliarAlumno } from 'src/familiar_alumno/entities/familiar_alumno.entity';

@Injectable()
export class AsistenciaService {

  constructor(
    @InjectRepository(Asistencia)
    private readonly asistenciaRepository: Repository<Asistencia>,
    @InjectRepository(Alumno)
    private readonly alumnoRepository: Repository<Alumno>,
    @InjectRepository(FamiliarAlumno)
    private readonly familiarAlumnoRepo: Repository<FamiliarAlumno>
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

  async findAll(user: any): Promise<Asistencia[]> {
    const rol = user.rol
    if (rol === 'Alumno') {
      return this.asistenciaRepository.find({ where: { legajo_alumno: user.legajo } })
    }
    if (rol === 'Familiar') {
      const relaciones = await this.familiarAlumnoRepo.find({
        where: { dni_familiar: user.dni }
      })
      const dniAlumnos = relaciones.map(rol => rol.dni_alumno)
      const alumnos = await this.alumnoRepository.find({
        where: { dni_alumno: In(dniAlumnos) }
      })
      const legajos = alumnos.map(a => a.legajo)
      return this.asistenciaRepository.find({
        where: { legajo_alumno: In(legajos) }
      })
    }
    return await this.asistenciaRepository.find();
  }

  async findOne(legajo: number, fecha: string, user: any): Promise<Asistencia | null> {
    const asistencia = await this.asistenciaRepository.findOne({
      where: {
        legajo_alumno: legajo,
        fecha,
      },
      relations: ['legajo_alumno']
    })
    if (!asistencia) {
      throw new Error('No se encontró la asistencia')
    }
    const rol = user.rol
    if (rol === 'Alumno' && user.legajo !== legajo) {
      throw new ForbiddenException('No se puede acceder a esta información')
    }
    if (rol === 'Familiar') {
      const alumno = await this.alumnoRepository.findOne({
        where: { legajo }
      })
      if (!alumno) {
        throw new NotFoundException('Alumno no encontrado')
      }
      const relacion = await this.familiarAlumnoRepo.findOne({
        where: {
          dni_familiar: user.dni,
          dni_alumno: alumno.dni_alumno
        }
      })
      if (!relacion) {
        throw new ForbiddenException('No puede acceder a esta información')
      }
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
