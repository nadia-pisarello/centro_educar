import { Injectable } from '@nestjs/common';
import { CreateHorarioClaseDto } from './dto/create-horario_clase.dto';
import { UpdateHorarioClaseDto } from './dto/update-horario_clase.dto';

@Injectable()
export class HorarioClaseService {
  create(createHorarioClaseDto: CreateHorarioClaseDto) {
    return 'This action adds a new horarioClase';
  }

  findAll() {
    return `This action returns all horarioClase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} horarioClase`;
  }

  update(id: number, updateHorarioClaseDto: UpdateHorarioClaseDto) {
    return `This action updates a #${id} horarioClase`;
  }

  remove(id: number) {
    return `This action removes a #${id} horarioClase`;
  }
}
